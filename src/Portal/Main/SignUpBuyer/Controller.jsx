import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth, firestore } from '../../../Provider/Firebase';
import View from './View';
import { ACCOUNT } from '../../../Provider/Routes';

const INITIAL_STATE = {
  error: '',
  email: '',
  password: '',
};

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  async handleSignUp(e) {
    const that = this;
    const { email, password } = this.state;
    const { history } = this.props;

    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        const userID = userCred.user.uid;
        return firestore
          .doc(`users/${userID}`)
          .set({
            email,
            role: 'buyer',
            ID: userID,
          });
      })
      .then(() => history.push(ACCOUNT))
      .catch(err => {
        that.setState({ error: err.message });
      });
  }

  render() {
    const { error, email, password } = this.state;

    return (
      <View
        error={error}
        email={email}
        password={password}
        onEmailChange={e => this.setState({ email: e.target.value })}
        onPasswordChange={e => this.setState({ password: e.target.value })}
        handleSignUp={this.handleSignUp}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Controller.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Controller);
