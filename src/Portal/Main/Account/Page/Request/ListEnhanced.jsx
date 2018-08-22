import React, { Component } from 'react';

import List from './List';
import { auth, firestore } from '../../../../../Provider/Firebase';

const INITIAL_STATE = {
  userID: '',
  requests: [],
};

const subscriptions = [];

class ListEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.getUserRole = this.getUserRole.bind(this);
    this.subscribeToRequests = this.subscribeToRequests.bind(this);
    this.getRequests = this.getRequests.bind(this);
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(
      auth.onAuthStateChanged(user => {
        if (user) {
          const userID = user.uid;
          that.setState({ userID });
          that.getUserRole(userID)
            .then(userRole => {
              that.setState({ userRole });
              that.subscribeToRequests(userID, userRole);
            });
        }
      }),
    );
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  getUserRole(userID) {
    return firestore
      .collection('users')
      .doc(userID)
      .get()
      .then(docRef => docRef.data().role);
  }

  subscribeToRequests(userID, userRole) {
    const that = this;
    const selector = userRole === 'buyer' ?
      ['buyer', '==', userID] :
      ['seller', '==', userID];

    return subscriptions.push(
      firestore.collection('processes')
        .where(...selector)
        .where('status', '==', 'request')
        .onSnapshot(querySnap => {
          const requestIDs = [];
          querySnap.forEach(docSnap => requestIDs.push(docSnap.get('request')));
          that.getRequests(requestIDs)
            .then(docSnaps => {
              const requests = docSnaps.map(docSnap => docSnap.data());
              that.setState({ requests });
            });
        }),
    );
  }

  getRequests(requestIDs) {
    const requestPromises = [];
    requestIDs.forEach(requestID => {
      const promise = firestore.collection('requests').doc(requestID).get();
      requestPromises.push(promise);
    });
    return Promise.all(requestPromises);
  }

  render() {
    const { requests } = this.state;
    return (
      <List requests={requests} />
    );
  }
}

export default ListEnhanced;
