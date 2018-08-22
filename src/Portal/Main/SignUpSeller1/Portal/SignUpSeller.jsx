import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import { Steps, Step } from '../../../_components/Steps';
import ChoosePackage from './ChoosePackage';
import ChooseLogin from './ChooseLogin';
import Checkout from './Checkout';

const SignUpSeller = ({
  error, currentStep, price, email, password,
  handlePackageSelected, handleNewUser, handleCheckout,
}) => (
  <div>
    <Steps current={currentStep}>
      <Step><ChoosePackage onPackageSelected={handlePackageSelected} /></Step>
      <Step><ChooseLogin onNewUser={handleNewUser} /></Step>
      <Step><Checkout
        price={price}
        email={email}
        password={password}
        onCheckout={handleCheckout}
      />
      </Step>
    </Steps>
    { error && <Alert className="mt-2" color="secondary">{error}</Alert> }
  </div>
);

SignUpSeller.propTypes = {
  error: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currentStep: PropTypes.number.isRequired,

  handlePackageSelected: PropTypes.func.isRequired,
  handleNewUser: PropTypes.func.isRequired,
  handleCheckout: PropTypes.func.isRequired,
};

export default SignUpSeller;
