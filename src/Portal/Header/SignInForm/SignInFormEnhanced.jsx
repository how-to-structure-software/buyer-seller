import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { auth } from '../../../Provider/Firebase/index';
import SignInForm from './SignInForm';
import { ACCOUNT } from '../../../Provider/Routes/index';

const INITIAL_STATE = {
  error: '',
  success: '',

  email: '',
  password: '',
};

class SignInFormEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.loginAsDemoBuyer = this.loginAsDemoBuyer.bind(this);
    this.loginAsDemoSeller = this.loginAsDemoSeller.bind(this);
    this.login = this.login.bind(this);
  }

  loginAsDemoBuyer(e) {
    e.preventDefault();
    const email = 'buyer@fnbk.cc';
    const password = 'buyer@fnbk.cc';
    this.login(email, password);
  }

  loginAsDemoSeller(e) {
    e.preventDefault();
    const email = 'seller@fnbk.cc';
    const password = 'seller@fnbk.cc';
    this.login(email, password);
  }

  handleSignIn(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.login(email, password);
  }

  login(email, password) {
    const that = this;
    const { history } = this.props;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push(ACCOUNT);
      })
      .catch(err => {
        /* eslint-disable no-console */
        console.log(`error:${JSON.stringify(err, null, 2)}`);
        that.setState({ error: err.message });
      });
  }

  render() {
    const {
      error,
      email, password,
    } = this.state;

    return (
      <SignInForm
        error={error}
        email={email}
        password={password}

        onEmailChange={e => this.setState({ email: e.target.value })}
        onPasswordChange={e => this.setState({ password: e.target.value })}

        loginAsDemoBuyer={this.loginAsDemoBuyer}
        loginAsDemoSeller={this.loginAsDemoSeller}

        handleSignIn={this.handleSignIn}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
SignInFormEnhanced.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(SignInFormEnhanced);
