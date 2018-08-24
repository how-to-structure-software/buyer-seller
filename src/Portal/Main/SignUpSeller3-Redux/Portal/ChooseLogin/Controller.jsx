import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChooseLogin from './ChooseLogin';
import { auth } from '../../../../../Provider/Firebase';

const INITIAL_STATE = {
  error: '',
  email: '',
  password: '',
};

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    const that = this;
    const { email, password } = this.state;
    const { onNewUser } = this.props;
    e.preventDefault();

    auth.fetchSignInMethodsForEmail(email)
      .then(result => {
        const alreadyInUse = result.length > 0;
        if (alreadyInUse) {
          that.setState({ error: 'This email is already in use. Please choose a different one.' });
        } else {
          onNewUser(email, password);
        }
      })
      .catch(err => {
        that.setState({ error: err.message });
      });
  }

  render() {
    const {
      error,
      email, password,
    } = this.state;

    return (
      <ChooseLogin
        error={error}
        email={email}
        password={password}

        onEmailChange={e => this.setState({ email: e.target.value })}
        onPasswordChange={e => this.setState({ password: e.target.value })}

        onSubmit={this.onSubmit}
      />
    );
  }
}

Controller.propTypes = {
  onNewUser: PropTypes.func.isRequired,
};

export default Controller;
