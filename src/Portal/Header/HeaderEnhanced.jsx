import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { auth } from '../../Provider/Firebase/index';
import Header from './Header';
import { LANDING } from '../../Provider/Routes/index';

const INITIAL_STATE = {
  error: '',
  success: '',

  isSignedIn: false,
  dropdownIsOpen: false,
};

const subscriptions = [];

class HeaderEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(
      auth.onAuthStateChanged(user => {
        if (user) {
          that.setState({ isSignedIn: true });
        }
      }),
    );
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  signOut(e) {
    const that = this;
    const { history } = this.props;

    e.preventDefault();
    auth.signOut()
      .then(() => {
        that.setState({ isSignedIn: false });
        history.push(LANDING);
      })
      .catch(error => {
        /* eslint-disable no-console */
        console.log(error);
        that.setState({ error });
      });
  }

  render() {
    const {
      error,
      dropdownIsOpen, isSignedIn,
    } = this.state;

    return (
      <Header
        error={error}
        isSignedIn={isSignedIn}
        dropdownIsOpen={dropdownIsOpen}

        toggleDropdown={() => this.setState({ dropdownIsOpen: !dropdownIsOpen })}
        signOut={this.signOut}

        handleSearch={this.handleSearch}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
HeaderEnhanced.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(HeaderEnhanced);
