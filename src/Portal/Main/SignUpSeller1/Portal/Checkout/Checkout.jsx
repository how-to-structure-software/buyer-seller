import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Form, Button } from 'reactstrap';

import { PAYPAL_CLIENT_ID } from '../../../../../Provider/Config';
import PaypalButton from '../../../../_components/PaypalButton';

const Checkout = ({
  error, price, total, couponValue, couponCode,
  onCouponCodeChange, redeemCoupon, onSuccess, onCancel, onError,
}) => (
  <div className="row">
    <div className="col-md-4 offset-md-4 mb-4">
      <div className="text-center mb-4 mt-5">
        <h1 className="h3 mb-5 font-weight-normal">SignUp Seller</h1>
      </div>
      <ul className="list-group mb-3">
        <li className="list-group-item d-flex justify-content-between lh-condensed">
          <div>
            <h6 className="my-0">Product name</h6>
            <small className="text-muted">Brief description</small>
          </div>
          <span className="text-muted">{price} €</span>
        </li>
        <li className="list-group-item d-flex justify-content-between bg-light">
          <div className="text-success">
            <h6 className="my-0">Promo code</h6>
            <small>EXAMPLECODE</small>
          </div>
          <span className="text-success">{couponValue === 0 ? '' : '-'}{couponValue} €</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <span>Total (EUR)</span>
          <strong>{total} €</strong>
        </li>
      </ul>

      <Form className="card p-2" onSubmit={redeemCoupon}>
        <div className="input-group">
          <input
            value={couponCode}
            onChange={onCouponCodeChange}
            type="text"
            className="form-control"
            placeholder="Coupon-Code"
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-secondary">Redeem</button>
          </div>
        </div>
      </Form>

      <div className="mt-5" style={{ textAlign: 'center' }}>
        <Button onClick={onSuccess}>Checkout without Paypal</Button>
        <PaypalButton
          client={{ sandbox: PAYPAL_CLIENT_ID }}
          env="sandbox"
          commit
          currency="EUR"
          total={total}
          onSuccess={onSuccess}
          onError={onError}
          onCancel={onCancel}
        />
        <span>
          <br />
          <u>Paypal Demo Account:</u><br />
          user: seller@fnbk.cc<br />
          password: seller@fnbk.cc<br />
        </span>
      </div>

      { error && <Alert className="mt-2" color="secondary">{error}</Alert> }

    </div>
  </div>
);

Checkout.propTypes = {
  error: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  couponValue: PropTypes.number.isRequired,
  couponCode: PropTypes.string.isRequired,
  onCouponCodeChange: PropTypes.func.isRequired,
  redeemCoupon: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default Checkout;
