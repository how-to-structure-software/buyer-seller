import React, { Component } from 'react';
import { auth, firestore } from '../../../../../Provider/Firebase';

import Profile from './Profile';

const INITIAL_STATE = {
  role: '',
};

const subscriptions = [];

class ProfileEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(
      auth.onAuthStateChanged(user => {
        if (user) {
          const userID = user.uid;
          firestore
            .collection('users')
            .doc(userID)
            .get()
            .then(docSnap => docSnap.get('role'))
            .then(role => that.setState({ role }));
        }
      }),
    );
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  render() {
    const { role } = this.state;

    return (
      <Profile role={role} />
    );
  }
}

export default ProfileEnhanced;
