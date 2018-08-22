import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import New from './New';
import { auth, firestore } from '../../../../../Provider/Firebase';
import { CONTRACTS } from '../../../../../Provider/Routes';

const INITIAL_STATE = {
  error: '',
  userID: '',
  title: '',
  deposit: 200,
  price: '',
  description: '',
};

const subscriptions = [];

class NewEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.subscribeToUser = this.subscribeToUser.bind(this);

    this.setError = this.setError.bind(this);
    this.getTitleFromRequest = this.getTitleFromRequest.bind(this);
    this.getPriceAndDescriptionFromOffer = this.getPriceAndDescriptionFromOffer.bind(this);
    this.getOfferIDFromProcessID = this.getOfferIDFromProcessID.bind(this);
    this.getOfferFromID = this.getOfferFromID.bind(this);

    this.handlePaypalSuccess = this.handlePaypalSuccess.bind(this);
    this.handlePaypalCancel = this.handlePaypalCancel.bind(this);
    this.handlePaypalError = this.handlePaypalError.bind(this);

    this.checkContract = this.checkContract.bind(this);
    this.createContract = this.createContract.bind(this);
    this.setProcessStatusToContract = this.setProcessStatusToContract.bind(this);
  }

  componentDidMount() {
    const that = this;
    const { match: { params: { processID } } } = this.props;

    const onUserLogin = async userID => {
      const title = await that.getTitleFromRequest(processID);
      const { price, description } = await that.getPriceAndDescriptionFromOffer(processID);
      that.setState({
        userID, processID, title, price, description,
      });
    };
    this.subscribeToUser(onUserLogin);
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  subscribeToUser(onUserLoggedIn) {
    subscriptions.push(
      auth.onAuthStateChanged(user => {
        if (user) {
          const userID = user.uid;
          onUserLoggedIn(userID);
        }
      }),
    );
  }

  setError(err) {
    this.setState({ error: err.message });
  }

  async getTitleFromRequest(processID) {
    return firestore
      .collection('processes')
      .doc(processID)
      .get()
      .then(docRef => docRef.data().title);
  }

  async getPriceAndDescriptionFromOffer(processID) {
    const offerID = await this.getOfferIDFromProcessID(processID);
    const { price, description } = await this.getOfferFromID(offerID);
    return { price, description };
  }

  async getOfferIDFromProcessID(processID) {
    return firestore
      .collection('processes')
      .doc(processID)
      .get()
      .then(docRef => docRef.data().offer);
  }

  async getOfferFromID(offerID) {
    return firestore
      .collection('offers')
      .doc(offerID)
      .get()
      .then(docRef => docRef.data());
  }

  handlePaypalCancel() {
    this.setState({ error: 'Paypal-Checkout has been aborted, pleas try again.' });
  }

  handlePaypalError(error) {
    const errMsg = `Paypal-Checkout has been aborted, pleas try again.: ${error}`;
    this.setState({ error: errMsg });
  }

  handlePaypalSuccess() {
    const that = this;
    const {
      history, match: { params: { processID } },
    } = this.props;
    const {
      userID, title, price, deposit, description,
    } = this.state;

    const handleNewContract = async () => {
      const contractID = await that.createContract(
        userID, processID, title, price, deposit, description,
      );
      await that.setProcessStatusToContract(processID, contractID);
      history.push(CONTRACTS);
    };

    const handleContractExists = () => {
      that.setState({ error: 'Offer has already been accepted.' });
    };

    this.checkContract(processID, handleContractExists, handleNewContract);
  }

  async checkContract(processID, onContractExists, onNewContract) {
    return firestore
      .collection('processes')
      .doc(processID)
      .get()
      .then(docRef => !!docRef.data().contract)
      .then(contractExits => (contractExits ? onContractExists() : onNewContract()));
  }

  async createContract(userID, processID, title, price, deposit, description) {
    return firestore
      .collection('contracts')
      .add({})
      .then(docRef => firestore
        .collection('contracts')
        .doc(docRef.id)
        .update({
          title, // request
          price, // offer
          deposit,
          description, // offer
          ID: docRef.id,
          owner: userID,
          timestamp: (new Date()).getTime(),
        })
        .then(() => Promise.resolve(docRef.id)));
  }

  async setProcessStatusToContract(processID, contractID) {
    return firestore
      .collection('processes')
      .doc(processID)
      .update({
        status: 'contract',
        contract: contractID,
      });
  }

  render() {
    const {
      error, title, deposit,
    } = this.state;

    return (
      <New
        error={error}
        title={title}
        deposit={deposit}

        onPaypalSuccess={this.handlePaypalSuccess}
        onPaypalCancel={this.handlePaypalCancel}
        onPaypalError={this.handlePaypalError}
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
