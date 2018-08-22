import React, { Component } from 'react';

import List from './List';
import { auth, firestore } from '../../../../../Provider/Firebase/index';

const INITIAL_STATE = {
  error: '',
  contracts: [],
};

const subscriptions = [];

class ListEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.setError = this.setError.bind(this);
    this.getUserRole = this.getUserRole.bind(this);
    this.subscribeToContracts = this.subscribeToContracts.bind(this);
    this.onContractChange = this.onContractChange.bind(this);
    this.getContractIDFromProcess = this.getContractIDFromProcess.bind(this);
    this.getContractFromID = this.getContractFromID.bind(this);
    this.getPopulatedContract = this.getPopulatedContract.bind(this);
  }

  componentDidMount() {
    const onUserLogin = async userID => {
      const userRole = await this.getUserRole(userID);
      this.subscribeToContracts(userID, userRole, this.onContractChange);
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

  async getUserRole(userID) {
    return firestore
      .collection('users')
      .doc(userID)
      .get()
      .then(docRef => docRef.data().role)
      .catch(this.setError);
  }

  subscribeToContracts(userID, userRole, onContractChange) {
    const selector = userRole === 'buyer' ?
      ['buyer', '==', userID] :
      ['seller', '==', userID];
    return subscriptions.push(
      firestore.collection('processes')
        .where(...selector)
        .where('status', '==', 'contract')
        .onSnapshot(querySnap => {
          const processIDs = [];
          querySnap.forEach(docSnap => processIDs.push(docSnap.id));
          onContractChange(processIDs);
        }),
    );
  }

  async onContractChange(processIDs) {
    const contractPromises = processIDs.map(this.getPopulatedContract);
    const contracts = await Promise.all(contractPromises);
    this.setState({ contracts });
  }

  async getPopulatedContract(processID) {
    const { contractID } = await this.getContractIDFromProcess(processID);
    const contract = await this.getContractFromID(contractID);
    return contract;
  }

  getContractIDFromProcess(processID) {
    return firestore
      .collection('processes')
      .doc(processID)
      .get()
      .then(docRef => docRef.data())
      .then(process => Promise.resolve({
        contractID: process.contract,
      }))
      .catch(this.setError);
  }

  getContractFromID(contractID) {
    return firestore
      .collection('contracts')
      .doc(contractID)
      .get()
      .then(docRef => docRef.data())
      .catch(this.setError);
  }

  render() {
    const { error, contracts } = this.state;

    return (
      <List error={error} contracts={contracts} />
    );
  }
}

export default ListEnhanced;
