import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

import { Steps, Step } from '../../_components/Steps';
import ChoosePackage from './ChoosePackage';
import ChooseLogin from './ChooseLogin';
import Checkout from './Checkout';

const SignUpSeller = ({
  error, currentStep, price, email, password,
  onPackageSelected, onLoginChosen, onCheckout,
}) => (
  <div>
    <Steps current={currentStep}>
      <Step><ChoosePackage onPackageSelected={onPackageSelected} /></Step>
      <Step><ChooseLogin onLoginChosen={onLoginChosen} /></Step>
      <Step><Checkout
        price={price}
        email={email}
        password={password}
        onCheckout={onCheckout}
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

  onPackageSelected: PropTypes.func.isRequired,
  onLoginChosen: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired,
};

export default SignUpSeller;
