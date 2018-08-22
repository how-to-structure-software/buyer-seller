import React, { Component } from 'react';

import SellerProfile from './SellerProfile';
import { auth, firestore } from '../../../../../../Provider/Firebase';

const INITIAL_STATE = {
  error: '',
  success: '',

  name: '',
  description: '',
  videoURL: '',
  logoURL: '',
  service: '',
  price: '',

  profileID: '',
};

const subscriptions = [];

class SellerProfileEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.newProfile = this.newProfile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(
      auth.onAuthStateChanged(user => {
        if (user) {
          const userID = user.uid;
          that.setState({ userID });
          subscriptions.push(
            firestore
              .collection('profiles')
              .where('owner', '==', userID)
              .onSnapshot(querySnap => {
                querySnap.forEach(docSnap => {
                  const profile = docSnap.data();
                  that.setState({ ...profile, profileID: profile.ID });
                });
              }),
          );
        }
      }),
    );
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  async newProfile() {
    /* eslint-disable no-return-await */
    return (async () => firestore
      .collection('profiles')
      .doc()
      .get()
      .then(docRef => docRef.id)
    )();
  }

  async handleSubmit(e) {
    e.preventDefault();

    const that = this;
    const {
      userID, profileID,
      name, description, videoURL, logoURL, service, price,
    } = this.state;

    const profile = {
      name,
      description,
      videoURL,
      logoURL,
      service,
      price,
      owner: userID,
    };

    let storeProfile;
    if (!profileID) {
      storeProfile = firestore
        .collection('profiles')
        .add({})
        .then(docSnap => firestore.collection('profiles').doc(docSnap.id).update({ ...profile, ID: docSnap.id }));
    } else {
      storeProfile = firestore
        .collection('profiles')
        .doc(profileID)
        .update(profile);
    }

    storeProfile
      .then(() => {
        that.setState({ success: 'Profile data has been saved.' });
      })
      .catch(err => {
        that.setState({ error: err.message });
      });
  }

  render() {
    const that = this;
    const {
      error, success,
      name, description, videoURL, logoURL, service, price,
    } = this.state;

    const isInvalid =
      name === '' ||
      description === '' ||
      videoURL === '' ||
      logoURL === '' ||
      service === '' ||
      price === '';

    return (
      <SellerProfile
        error={error}
        success={success}

        name={name}
        description={description}
        videoURL={videoURL}
        logoURL={logoURL}
        service={service}
        price={price}

        onNameChange={e => that.setState({ name: e.target.value })}
        onDescriptionChange={e => this.setState({ description: e.target.value })}
        onVideoURLChange={e => this.setState({ videoURL: e.target.value })}
        onLogoURLChange={e => this.setState({ logoURL: e.target.value })}
        onServiceChange={e => this.setState({ service: e.target.value })}
        onPriceChange={e => this.setState({ price: e.target.value })}

        handleSubmit={this.handleSubmit}
        isInvalid={isInvalid}
      />
    );
  }
}

export default SellerProfileEnhanced;
