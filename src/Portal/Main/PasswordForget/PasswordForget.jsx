import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Input, Button, Alert,
} from 'reactstrap';

import './styles.css';

const PasswordForget = ({
  error, success, email, onEmailChange, resetPassword,
}) => (
  <Form onSubmit={resetPassword} className="form-centered mt-5">
    <div className="text-center mb-4">
      <h1 className="h3 mb-5 font-weight-normal">password forgot</h1>
    </div>
    <FormGroup>
      <Input
        value={email}
        onChange={onEmailChange}
        type="email"
        className="form-control"
        placeholder="Email address"
        autoFocus
      />
    </FormGroup>
    <Button className="btn btn-lg btn-primary btn-block" type="submit">password reset</Button>
    { error && <Alert className="mt-2" color="secondary">{error}</Alert> }
    { success && <Alert className="mt-2" color="success">{success}</Alert> }
  </Form>
);

PasswordForget.propTypes = {
  error: PropTypes.string.isRequired,
  success: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

export default PasswordForget;
