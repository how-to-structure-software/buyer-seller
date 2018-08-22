import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { firestore, auth } from '../../../Provider/Firebase';
import { NEW_REQUEST } from '../../../Provider/Routes';
import PublicProfile from './PublicProfile';

import './styles.scss';

const INITIAL_STATE = {
  error: '',
  success: '',
  userID: '',
  sellerID: '',

  name: '',
  videoURL: '',
  logoURL: '',
  city: '',
  email: '',
  street: '',
  zipCode: '',
  phoneNumber: '',
  description: '',
  service: '',
  price: '',

  watchlist: [],
};

const subscriptions = [];

class PublicProfileEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.subscribeToPublicProfile = this.subscribeToPublicProfile.bind(this);
    this.subscribeToWatchlist = this.subscribeToWatchlist.bind(this);
    this.subscribeToUser = this.subscribeToUser.bind(this);

    this.addToWatchlist = this.addToWatchlist.bind(this);
    this.addToLocalWatchlist = this.addToLocalWatchlist.bind(this);
    this.addToArray = this.addToArray.bind(this);
    this.addToRemoteWatchlist = this.addToRemoteWatchlist.bind(this);
    this.getNewRemoteWatchlist = this.getNewRemoteWatchlist.bind(this);
    this.getRemoteWatchlist = this.getRemoteWatchlist.bind(this);
    this.updateRemoteWatchlist = this.updateRemoteWatchlist.bind(this);
  }

  componentDidMount() {
    const that = this;
    const { match: { params: { profileID } } } = this.props;

    // onChange
    const onProfileChange = profile => that.setState({ ...profile, sellerID: profile.owner });
    const onWatchlistChange = watchlist => that.setState({ watchlist });
    const onUserLogin = userID => {
      that.setState({ userID });
      that.subscribeToWatchlist(userID, onWatchlistChange);
    };

    // subscribe
    this.subscribeToPublicProfile(profileID, onProfileChange);
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

  subscribeToPublicProfile(profileID, onProfileChange) {
    subscriptions.push(
      firestore
        .collection('profiles')
        .doc(profileID)
        .onSnapshot(docSnap => onProfileChange(docSnap.data())),
    );
  }


  subscribeToWatchlist(userID, onWatchlistChange) {
    subscriptions.push(
      firestore
        .collection('watchlists')
        .where('owner', '==', userID)
        .onSnapshot(querySnap => {
          if (!querySnap.empty) {
            const watchlist = querySnap.docs[0].get('watchlist') || [];
            onWatchlistChange(watchlist);
          }
        }),
    );
  }

  async addToWatchlist(e) {
    const that = this;
    const { match: { params: { profileID } } } = this.props;
    const { userID } = this.state;
    e.preventDefault();

    // FLOW
    // add to local watchlist
    // add to remote watchlist
    //   get remote watchlist
    //     if not exists create watchlist
    //   add element to array
    //   update remote watchlist
    this.addToLocalWatchlist(profileID);
    this.addToRemoteWatchlist(userID, profileID)
      .then(() => that.setState({ success: 'Profile has been added to your watchlist.' }))
      .catch(err => that.setState({ error: err.message }));
  }

  addToLocalWatchlist(profileID) {
    let { watchlist } = this.state;
    watchlist = this.addToArray(watchlist, profileID);
    this.setState({ watchlist });
  }

  addToArray(watchlist, profileID) {
    const notFound = watchlist.indexOf(profileID) === -1;
    if (notFound) {
      watchlist.push(profileID);
    }
    return watchlist;
  }

  async addToRemoteWatchlist(userID, profileID) {
    // Deeper levels handle the specific database format,
    // here we see the watchlist as a simple list.
    let watchlist = await this.getRemoteWatchlist(userID, this.getNewRemoteWatchlist);
    watchlist = this.addToArray(watchlist, profileID);
    return this.updateRemoteWatchlist(watchlist, userID);
  }

  async getNewRemoteWatchlist(userID) {
    return firestore
      .collection('watchlists')
      .add({ })
      .then(docRef => {
        const watchlistID = docRef.id;
        docRef.set({ owner: userID, profiles: [], ID: watchlistID });
      })
      .then(() => Promise.resolve([]));
  }

  async getRemoteWatchlist(userID, onWatchlistNotFound) {
    return firestore
      .collection('watchlists')
      .where('owner', '==', userID)
      .get()
      .then(querySnap => {
        if (querySnap.empty) {
          return onWatchlistNotFound(userID);
        }
        const profiles = querySnap.docs[0].get('profiles') || [];
        return Promise.resolve(profiles);
      });
  }

  async updateRemoteWatchlist(watchlist, userID) {
    return firestore
      .collection('watchlists')
      .where('owner', '==', userID)
      .get()
      .then(querySnap => querySnap.docs[0].ref)
      .then(watchlistRef => Promise.resolve(watchlistRef.update({ profiles: watchlist })));
  }

  render() {
    const {
      error, success,
      sellerID,
      name, videoURL, logoURL, street, zipCode, phoneNumber, email, city,
      description, service, price,
    } = this.state;

    const newRequestPath = NEW_REQUEST.replace(':sellerID', sellerID);
    return (
      <PublicProfile
        error={error}
        success={success}
        newRequestPath={newRequestPath}

        name={name}
        logoURL={logoURL}
        videoURL={videoURL}
        city={city}
        street={street}
        zipCode={zipCode}
        phoneNumber={phoneNumber}
        email={email}
        description={description}
        price={price}
        service={service}

        addToWatchlist={this.addToWatchlist}
      />
    );
  }
}

PublicProfileEnhanced.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      profileID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PublicProfileEnhanced;
