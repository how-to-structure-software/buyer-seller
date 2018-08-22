import React, { Component } from 'react';

import List from './List';
import { auth, firestore } from '../../../../../Provider/Firebase';

const INITIAL_STATE = {
  userID: '',
  offers: [],
};

const subscriptions = [];

class ListEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.getUserRole = this.getUserRole.bind(this);
    this.subscribeToOffers = this.subscribeToOffers.bind(this);
    this.getOffers = this.getOffers.bind(this);
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(auth.onAuthStateChanged(user => {
      if (user) {
        const userID = user.uid;
        that.setState({ userID });
        that.getUserRole(userID)
          .then(userRole => {
            that.setState({ userRole });
            subscriptions.push(
              this.subscribeToOffers(userID, userRole),
            );
          });
      }
    }));
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

  subscribeToOffers(userID, userRole) {
    const that = this;
    const selector = userRole === 'buyer' ?
      ['buyer', '==', userID] :
      ['seller', '==', userID];

    return firestore.collection('processes')
      .where(...selector)
      .where('status', '==', 'offer')
      .onSnapshot(querySnap => {
        const offerIDsWithTitle = {};
        querySnap.forEach(docSnap => {
          const offerID = docSnap.get('offer');
          offerIDsWithTitle[offerID] = docSnap.get('title');
        });
        const offerIDs = Object.keys(offerIDsWithTitle);
        that.getOffers(offerIDs)
          .then(docSnaps => {
            const offers = docSnaps.map(docSnap => {
              const offer = docSnap.data();
              return {
                ...offer,
                title: offerIDsWithTitle[offer.ID],
              };
            });
            that.setState({ offers });
          });
      });
  }

  getOffers(offerIDs) {
    const offerPromises = offerIDs.map(offerID => firestore.collection('offers').doc(offerID).get());
    return Promise.all(offerPromises);
  }

  render() {
    const { offers } = this.state;
    return (
      <List offers={offers} />
    );
  }
}

export default ListEnhanced;
