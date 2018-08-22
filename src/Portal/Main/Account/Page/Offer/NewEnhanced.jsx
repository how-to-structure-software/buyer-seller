import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import New from './New';
import { auth as firebaseAuth, firestore } from '../../../../../Provider/Firebase';
import { OFFERS } from '../../../../../Provider/Routes';


const INITIAL_STATE = {
  error: '',
  userID: '',
  description: '',
  details: '',
  price: '',
};

const subscriptions = [];

class NewEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleNewOffer = this.handleNewOffer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        that.setState({ userID: user.uid });
      }
    }));
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  handleChange(key) {
    const that = this;
    return e => {
      that.setState({ [key]: e.target.value });
    };
  }

  handleNewOffer(e) {
    e.preventDefault();

    const {
      userID,
      description, price,
    } = this.state;

    const { history, match: { params: { processID } } } = this.props;

    const createNewDocument = () => firestore
      .collection('offers')
      .add({})
      .then(docRef => docRef.id);

    const updateData = offerID => {
      firestore
        .collection('offers')
        .doc(offerID)
        .update({
          description,
          price,
          ID: offerID,
          owner: userID,
          timestamp: (new Date()).getTime(),
        });
      return Promise.resolve(offerID);
    };

    const createOffer = () => Promise.resolve()
      .then(createNewDocument)
      .then(updateData);

    const updateProcess = offerID => firestore
      .collection('processes')
      .doc(processID)
      .update({
        status: 'offer',
        offer: offerID,
      });

    const redirectUser = () => history.push(OFFERS);

    // FLOW:
    // create offer
    //   create new document
    //   update data
    // update process
    Promise.resolve()
      .then(createOffer)
      .then(updateProcess)
      .then(redirectUser)
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    const {
      error, description, price,
    } = this.state;

    const isInvalid =
      description === '' ||
      price === '';

    return (
      <New
        error={error}
        description={description}
        price={price}

        onDescriptionChange={this.handleChange('description')}
        onPriceChange={this.handleChange('price')}

        isInvalid={isInvalid}
        handleNewOffer={this.handleNewOffer}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
NewEnhanced.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      processID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(NewEnhanced);
