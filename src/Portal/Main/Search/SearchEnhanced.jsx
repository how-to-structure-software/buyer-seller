import React, { Component } from 'react';
import QueryString from 'query-string';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { firestore } from '../../../Provider/Firebase';
import Search from './Search';
import { SEARCH } from '../../../Provider/Routes';

const INITIAL_STATE = {
  error: '',
  success: '',

  sellers: [],
  country: '',
  service: '',
  price: '',
};

class SearchEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };


    this.handleSearch = this.handleSearch.bind(this);
    this.firestoreCollectionQueryBuilder = this.firestoreCollectionQueryBuilder.bind(this);
  }

  componentDidMount() {
    const { location: { search } } = this.props;
    if (search) {
      this.updateSellers(search);
    }
  }

  componentWillUpdate(nextProps) {
    /* eslint-disable react/destructuring-assignment */
    if (!nextProps.location.search) {
      return;
    }
    if (nextProps.location.search !== this.props.location.search) {
      this.updateSellers(nextProps.location.search);
    }
  }

  updateSellers(search) {
    const that = this;
    const query = QueryString.parse(search);

    const whereClauses = [];
    if (query) {
      if (query.country) {
        whereClauses.push(['country', '==', query.country]);
      }
      if (query.service) {
        whereClauses.push(['service', '==', query.service]);
      }
      if (query.price) {
        whereClauses.push(['price', '==', query.price]);
      }
    }

    const queryPromise = this.firestoreCollectionQueryBuilder('profiles', whereClauses);
    queryPromise
      .get()
      .then(querySnaps => {
        const sellers = [];
        querySnaps.forEach(p => {
          const profileID = p.id;
          const description = p.get('description') || '';
          const name = p.get('name') || '';
          const videoURL = p.get('videoURL') || '';
          sellers.push({
            profileID, description, name, videoURL,
          });
        });
        return sellers;
      })
      .then(sellers => {
        that.setState({ sellers });
      });
  }

  firestoreCollectionQueryBuilder(collection, whereClauses) {
    const reducer = (acc, w) => acc.where(w[0], w[1], w[2]);
    return whereClauses.reduce(reducer, firestore.collection(collection));
  }

  async handleSearch(e) {
    const {
      country, service, price,
    } = this.state;
    const { history } = this.props;

    e.preventDefault();

    const query = { country, service, price };
    const searchString = QueryString.stringify(query);

    history.push({
      pathname: SEARCH,
      search: searchString,
    });
  }

  render() {
    const {
      error, success,
      sellers, country, service, price,
    } = this.state;

    return (
      <Search
        error={error}
        success={success}

        sellers={sellers}
        country={country}
        service={service}
        price={price}

        onCountryChange={e => this.setState({ country: e.target.value })}
        onServiceChange={e => this.setState({ service: e.target.value })}
        onPriceChange={e => this.setState({ price: e.target.value })}

        handleSearch={this.handleSearch}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
SearchEnhanced.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.object.isRequired,
};

SearchEnhanced.defaultProps = {
  location: {
    search: '',
  },
};

export default withRouter(SearchEnhanced);
