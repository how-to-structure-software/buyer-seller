import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

import Checkout from './Checkout';
import Dependency from '../Dependency';
import { ACCOUNT } from '../../../../Provider/Routes';
import { auth, firestore } from '../../../../Provider/Firebase';

const INITIAL_STATE = {
  error: '',

  couponValue: 0,
  couponCode: '',
};

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.onRedeemCoupon = this.onRedeemCoupon.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onError = this.onError.bind(this);
  }

  onRedeemCoupon(e) {
    e.preventDefault();
    const { couponCode } = this.state;
    const CouponLookup = {
      video1: 96,
      video2: 196,
      video3: 296,
    };
    const couponValue = CouponLookup[couponCode] || 0;
    this.setState({ couponValue });
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

  onSuccess() {
    const { history } = this.props;
    const { dependency: { email, password }, dependency } = this.props;
    this.createUser(email, password)
      .then(() => history.push(ACCOUNT))
      .then(() => dependency.goToNextStep())
      .catch(err => this.setState({ error: err.message }));
  }

  onCancel() {
    this.setState({ error: 'Paypal-Checkout has been aborted, pleas try again.' });
  }

  onError(error) {
    this.setState({ error: `There has been an error while checking out with Paypal: ${error}` });
  }

  render() {
    const {
      error, couponValue, couponCode,
    } = this.state;
    const { dependency: { price } } = this.props;

    const total = price - couponValue < 0 ? 1 : price - couponValue;

    return (
      <Checkout
        error={error}

        price={price}
        total={total}
        couponValue={couponValue}
        couponCode={couponCode}

        onCouponCodeChange={e => this.setState({ couponCode: e.target.value })}

        onRedeemCoupon={this.onRedeemCoupon}
        onSuccess={this.onSuccess}
        onCancel={this.onCancel}
        onError={this.onError}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Controller.propTypes = {
  history: PropTypes.object.isRequired,
  dependency: PropTypes.instanceOf(Dependency).isRequired,
};

const decorate = compose(
  withRouter,
);

export default decorate(Controller);
