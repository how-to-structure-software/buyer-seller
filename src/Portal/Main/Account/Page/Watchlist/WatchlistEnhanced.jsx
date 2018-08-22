import React, { Component } from 'react';

import Watchlist from './Watchlist';
import { firestore, auth as firebaseAuth } from '../../../../../Provider/Firebase';

const INITIAL_STATE = {
  error: '',
  success: '',
  userID: '',
  watchlistID: '',
  profiles: [],
};

const subscriptions = [];

class WatchlistEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.clearWatchlist = this.clearWatchlist.bind(this);
    this.clearElementFromWatchlist = this.clearElementFromWatchlist.bind(this);
    this.updateProfiles = this.updateProfiles.bind(this);
    this.subscribeToWatchlist = this.subscribeToWatchlist.bind(this);
    this.getProfiles = this.getProfiles.bind(this);
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(
      firebaseAuth.onAuthStateChanged(user => {
        if (user) {
          const userID = user.uid;
          that.setState({ userID });
          that.subscribeToWatchlist(userID, this.updateProfiles);
        }
      }),
    );
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  subscribeToWatchlist(userID, onUpdate) {
    return subscriptions.push(
      firestore.collection('watchlists')
        .where('owner', '==', userID)
        .onSnapshot(snapshot => {
          snapshot.forEach(docSnap => {
            onUpdate(docSnap.data());
          });
        }),
    );
  }

  getProfiles(profileIDs) {
    const profilePromises = [];
    profileIDs.forEach(profileID => {
      const promise = firestore.collection('profiles').doc(profileID).get();
      profilePromises.push(promise);
    });
    return Promise.all(profilePromises);
  }

  updateProfiles(watchlist) {
    const that = this;
    const watchlistID = watchlist.ID;
    this.setState({ watchlistID });
    const profileIDs = watchlist.profiles;
    if (profileIDs) {
      this.getProfiles(profileIDs)
        .then(profileDocSnaps => {
          const profiles = profileDocSnaps.map(docSnap => docSnap.data());
          that.setState({ profiles });
        });
    }
  }

  clearWatchlist() {
    const { watchlistID } = this.state;
    const document = firestore.collection('watchlists').doc(watchlistID);
    firestore.runTransaction(transaction => transaction.get(document).then(doc => {
      const data = doc.data();
      data.profiles = [];
      return transaction.update(document, data);
    }));
  }

  clearElementFromWatchlist(profileID) {
    return () => {
      const { watchlistID } = this.state;
      const document = firestore.collection('watchlists').doc(watchlistID);
      firestore.runTransaction(transaction => transaction.get(document).then(doc => {
        const data = doc.data();
        const index = data.profiles.indexOf(profileID);
        if (index > -1) {
          data.profiles.splice(index, 1);
        }
        return transaction.update(document, data);
      }));
    };
  }

  render() {
    const { error, success, profiles } = this.state;

    return (
      <Watchlist
        error={error}
        success={success}
        profiles={profiles}
        clearWatchlist={this.clearWatchlist}
        clearElementFromWatchlist={this.clearElementFromWatchlist}
      />
    );
  }
}

export default WatchlistEnhanced;
