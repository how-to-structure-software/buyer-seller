import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkout from './Checkout';

const INITIAL_STATE = {
  error: '',

  couponValue: 0,
  couponCode: '',
};

class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.redeemCoupon = this.redeemCoupon.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onError = this.onError.bind(this);
  }

  redeemCoupon(e) {
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

  onSuccess() {
    const { onCheckout } = this.props;
    onCheckout();
  }

  onCancel() {
    this.setState({ error: 'Paypal-Checkout has been aborted, pleas try again.' });
  }

  onError(error) {
    this.setState({ error: `Paypal-Checkout has been aborted, pleas try again.: ${error}` });
  }

  render() {
    const {
      error, couponValue, couponCode,
    } = this.state;
    const { price } = this.props;

    const total = price - couponValue < 0 ? 1 : price - couponValue;

    return (
      <Checkout
        error={error}

        price={price}
        total={total}
        couponValue={couponValue}
        couponCode={couponCode}

        onCouponCodeChange={e => this.setState({ couponCode: e.target.value })}

        redeemCoupon={this.redeemCoupon}
        onSuccess={this.onSuccess}
        onCancel={this.onCancel}
        onError={this.onError}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
Controller.propTypes = {
  price: PropTypes.number.isRequired,
  onCheckout: PropTypes.func.isRequired,

};

export default Controller;
