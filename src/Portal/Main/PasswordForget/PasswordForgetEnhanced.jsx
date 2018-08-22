import React, { Component } from 'react';

import { auth } from '../../../Provider/Firebase';
import PasswordForget from './PasswordForget';

const INITIAL_STATE = {
  error: '',
  success: '',

  email: '',
};

class PasswordForgetEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.resetPassword = this.resetPassword.bind(this);
  }

  async resetPassword(e) {
    const that = this;
    const {
      email,
    } = this.state;

    e.preventDefault();

    const blacklist = ['buyer@fnbk.cc', 'seller@fnbk.cc'];

    if (blacklist.indexOf(email) > -1) {
      that.setState({ error: 'This is a test account. Password changes are not allowed!' });
      return;
    }

    auth.sendPasswordResetEmail(email)
      .then(() => {
        that.setState({
          email: '',
          success: 'Password has been reset. Please check your mail.',
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
      <PasswordForget
        error={error}
        success={success}

        email={email}
        onEmailChange={e => this.setState({ email: e.target.value })}

        resetPassword={this.resetPassword}
        isInvalid={isInvalid}
      />
    );
  }
}

export default PasswordForgetEnhanced;
