import React from 'react';
import {
  Button,
  Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';

import PaypalButton from '../../../../_components/PaypalButton';
import { PAYPAL_CLIENT_ID } from '../../../../../Provider/Config';

/* eslint-disable react/no-array-index-key */
const New = ({
  error,
  title, deposit,
  onPaypalSuccess, onPaypalCancel, onPaypalError,
}) => (
  <div>


    <div className="row">
      <div className="col-md-12">
        <h4>make deposit</h4>
      </div>
    </div>

    { error && <Alert className="mt-2" color="secondary">{error}</Alert> }

    <ul className="list-group mb-3">
      <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
          <h6 className="my-0">deposit</h6>
          <small className="text-muted">{title}</small>
        </div>
        <span className="text-muted">{deposit} €</span>
      </li>
      <li className="list-group-item d-flex justify-content-between">
        <span>total (EUR)</span>
        <strong>{deposit} €</strong>
      </li>
    </ul>

    <div className="mt-5" style={{ textAlign: 'center' }}>
      <Button onClick={onPaypalSuccess}>make a deposit</Button>
      <PaypalButton
        client={{ sandbox: PAYPAL_CLIENT_ID }}
        env="sandbox"
        commit
        currency="EUR"
        total={deposit}
        onSuccess={onPaypalSuccess}
        onError={onPaypalError}
        onCancel={onPaypalCancel}
      />
      <span>
        <br />
        <u>Paypal Demo Account:</u><br />
          user: buyer@fnbk.cc<br />
          password: buyer@fnbk.cc<br />
      </span>
    </div>

  </div>
);

New.propTypes = {
  error: PropTypes.string.isRequired,

  title: PropTypes.string.isRequired,
  deposit: PropTypes.number.isRequired,

  onPaypalSuccess: PropTypes.func.isRequired,
  onPaypalCancel: PropTypes.func.isRequired,
  onPaypalError: PropTypes.func.isRequired,
};

export default New;
