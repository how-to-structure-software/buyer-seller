import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

// PROVIDER
// It is recommended to provide mutable data via render props
// (history object, redux state, firebase state - session)
import { withRouter } from 'react-router-dom';
import { withSignUpSellerOperations, withSignUpSellerData } from '../Interior';

import SignUpSeller from './SignUpSeller';
import { ACCOUNT } from '../../../../Provider/Routes';

class Controller extends Component {
  constructor(props) {
    super(props);

    this.handlePackageSelected = this.handlePackageSelected.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  handlePackageSelected(price) {
    const { setPrice, nextStep } = this.props;
    return () => {
      setPrice(price);
      nextStep();
    };
  }

  handleNewUser(email, password) {
    const { setEmailPassword, nextStep } = this.props;
    setEmailPassword(email, password);
    nextStep();
  }

  handleCheckout() {
    const { email, password } = this.props;
    const {
      createUser, nextStep, history, setError,
    } = this.props;
    createUser(email, password)
      .then(() => history.push(ACCOUNT))
      .then(() => nextStep())
      .catch(err => setError(err.message));
  }

  render() {
    const {
      error, price, email, password, currentStep,
    } = this.props;

    return (
      <SignUpSeller
        error={error}
        currentStep={currentStep}
        price={price}
        email={email}
        password={password}
        handlePackageSelected={this.handlePackageSelected}
        handleNewUser={this.handleNewUser}
        handleCheckout={this.handleCheckout}
      />
    );
  }
}


Controller.propTypes = {
  // data - signUpSellerData
  currentStep: PropTypes.oneOf([0, 1, 2]).isRequired,
  price: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,

  // operations - signUpSellerOperations
  nextStep: PropTypes.func.isRequired,
  setPrice: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  setEmailPassword: PropTypes.func.isRequired,

  // operations - router
  history: PropTypes.shape().isRequired,
};

const enhance = compose(
  withRouter,
  withSignUpSellerData,
  withSignUpSellerOperations,
  // withSession,
);
export default enhance(Controller);
// export default Controller;
