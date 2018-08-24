import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';

// PROVIDER
import { withRouter } from 'react-router-dom';
import { withSignUpSellerOperations, withSignUpSellerData } from '../Interior';

// PROJECT files
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
  // data - redux data
  currentStep: PropTypes.oneOf([0, 1, 2]).isRequired,
  price: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,

  // operations - redux action creators
  nextStep: PropTypes.func.isRequired,
  setPrice: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setEmailPassword: PropTypes.func.isRequired,

  // operations - interior
  createUser: PropTypes.func.isRequired,

  // operations - router
  history: PropTypes.shape().isRequired,
};

const enhance = compose(
  withRouter,
  withSignUpSellerData,
  withSignUpSellerOperations,
);
export default enhance(Controller);
