import React, { Component } from 'react';

import SellerUserData from './SellerUserData';
import { auth, firestore } from '../../../../../../Provider/Firebase';

const INITIAL_STATE = {
  error: '',
  success: '',

  firstName: '',
  lastName: '',
  phoneNumber: '',
  street: '',
  zipCode: '',
  city: '',
  country: '',
  email: '',

  profileID: '',
};

const subscriptions = [];

class SellerUserDataEnhanced extends Component {
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
          subscriptions.push(firestore
            .collection('profiles')
            .where('owner', '==', userID)
            .onSnapshot(querySnap => {
              querySnap.forEach(docSnap => {
                const profile = docSnap.data();
                that.setState({ ...profile, profileID: profile.ID });
              });
            }));
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
      firstName, lastName, phoneNumber, street, zipCode, city, country, email,
    } = this.state;

    const profile = {
      firstName,
      lastName,
      phoneNumber,
      street,
      zipCode,
      city,
      country,
      email,
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
        that.setState({ success: 'User data hast been saved.' });
      })
      .catch(err => {
        that.setState({ error: err.message });
      });
  }

  render() {
    const that = this;
    const {
      error, success,
      firstName, lastName, phoneNumber, street, zipCode, city, country, email,
    } = this.state;

    const isInvalid =
      firstName === '' ||
      lastName === '' ||
      phoneNumber === '' ||
      street === '' ||
      zipCode === '' ||
      city === '' ||
      email === '' ||
      country === '';

    return (
      <SellerUserData
        error={error}
        success={success}
        firstName={firstName}
        lastName={lastName}
        phoneNumber={phoneNumber}
        street={street}
        zipCode={zipCode}
        city={city}
        country={country}
        email={email}
        onFirstNameChange={e => that.setState({ firstName: e.target.value })}
        onLastNameChange={e => this.setState({ lastName: e.target.value })}
        onPhoneNumberChange={e => this.setState({ phoneNumber: e.target.value })}
        onStreetChange={e => this.setState({ street: e.target.value })}
        onZipCodeChange={e => this.setState({ zipCode: e.target.value })}
        onCityChange={e => this.setState({ city: e.target.value })}
        onCountryChange={e => this.setState({ country: e.target.value })}
        onEmailChange={e => this.setState({ email: e.target.value })}
        handleSubmit={this.handleSubmit}
        isInvalid={isInvalid}
      />
    );
  }
}

export default SellerUserDataEnhanced;
