import React, { Component } from 'react';

import { auth } from '../../../../../../Provider/Firebase';
import PasswordChange from './PasswordChange';

const INITIAL_STATE = {
  error: '',
  success: '',

  email: '',
  password1: '',
  password2: '',

  profileID: '',
};

const subscriptions = [];

class PasswordChangeEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.changePassword = this.changePassword.bind(this);
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(
      auth.onAuthStateChanged(user => {
        if (user) {
          const { email } = user;
          that.setState({ email });
        }
      }),
    );
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  async changePassword(e) {
    const that = this;
    const {
      password1, password2, email,
    } = this.state;

    e.preventDefault();

    const isInvalid = password1 !== password2 || password1 === '';
    const blacklist = ['buyer@fnbk.cc', 'seller@fnbk.cc'];

    if (isInvalid) {
      that.setState({ error: 'invalid password' });
      return;
    }

    if (blacklist.indexOf(email) > -1) {
      that.setState({ error: 'The password cannot be changed for this test-account.' });
      return;
    }

    auth.currentUser.updatePassword(password1)
      .then(() => {
        that.setState({
          password1: '',
          password2: '',
          success: 'Password has been successfully changed.',
        });
      })
      .catch(err => {
        that.setState({ error: err.message });
      });
  }

  render() {
    const {
      error, success,
      email, password1, password2,
    } = this.state;

    const isInvalid = password1 !== password2 || password1 === '';

    return (
      <PasswordChange
        error={error}
        success={success}

        email={email}
        password1={password1}
        password2={password2}

        onPassword1Change={e => this.setState({ password1: e.target.value })}
        onPassword2Change={e => this.setState({ password2: e.target.value })}

        changePassword={this.changePassword}
        isInvalid={isInvalid}
      />
    );
  }
}

export default PasswordChangeEnhanced;
