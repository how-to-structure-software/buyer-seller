import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import SignUpSeller from './SignUpSeller';
import { ACCOUNT } from '../../../Provider/Routes';
import { auth, firestore } from '../../../Provider/Firebase';


const INITIAL_STATE = {
  error: '',
  currentStep: 0,
  price: 0,
  email: '',
  password: '',

};
class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;

    this.handlePackageSelected = this.handlePackageSelected.bind(this);
    this.handleLoginChosen = this.handleLoginChosen.bind(this);
    this.handleCheckedOut = this.handleCheckedOut.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  handlePackageSelected(price) {
    const that = this;
    return () => {
      that.setState({ price });
      that.nextStep();
    };
  }

  handleLoginChosen(email, password) {
    this.setState({ email, password });
    this.nextStep();
  }

  handleCheckedOut() {
    const { email, password } = this.state;
    const { history } = this.props;
    this.createUser(email, password)
      .then(() => history.push(ACCOUNT))
      .then(() => this.nextStep())
      .catch(err => this.setState({ error: err.message }));
  }

  createUser(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        const userID = userCred.user.uid;
        return firestore
          .doc(`users/${userID}`)
          .set({
            email,
            role: 'seller',
            ID: userID,
          });
      });
  }

  nextStep() {
    let { currentStep } = this.state;
    currentStep = currentStep === 2 ? 0 : currentStep + 1;
    this.setState({ currentStep });
  }

  render() {
    const {
      error, price, email, password, currentStep,
    } = this.state;

    return (
      <SignUpSeller
        error={error}
        currentStep={currentStep}
        price={price}
        email={email}
        password={password}
        onPackageSelected={this.handlePackageSelected}
        onLoginChosen={this.handleLoginChosen}
        onCheckedOut={this.handleCheckedOut}
      />
    );
  }
}


Controller.propTypes = {
  history: PropTypes.shape().isRequired,
};

const enhance = compose(
  withRouter,
);
export default enhance(Controller);
