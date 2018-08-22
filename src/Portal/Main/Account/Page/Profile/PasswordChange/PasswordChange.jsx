import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Input, Button, Alert,
} from 'reactstrap';

import './styles.css';

const PasswordChange = ({
  error, success, email, password1, password2, isInvalid,
  onPassword1Change, onPassword2Change, changePassword,
}) => (
  <Form onSubmit={changePassword} className="col-md-12">
    <FormGroup>
      <div className="row">
        <div className="col-md-12 mb-3">
          <input value={email} className="form-control" type="text" disabled />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <Input
            value={password1}
            onChange={onPassword1Change}
            className=""
            type="password"
            name="passwordOne"
            placeholder="new password"
            required
            autoFocus
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <Input
            value={password2}
            onChange={onPassword2Change}
            className=""
            type="password"
            name="passwordTwo"
            placeholder="confirm password"
            required
          />
        </div>
      </div>
    </FormGroup>
    <Button disabled={isInvalid} className="float-right" type="submit">change password</Button>
    { error && <Alert className="mt-2" color="secondary">{error}</Alert> }
    { success && <Alert className="mt-2" color="success">{success}</Alert> }
  </Form>
);

PasswordChange.propTypes = {
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password1: PropTypes.string.isRequired,
  password2: PropTypes.string.isRequired,
  isInvalid: PropTypes.bool.isRequired,
  onPassword1Change: PropTypes.func.isRequired,
  onPassword2Change: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
};

export default PasswordChange;
