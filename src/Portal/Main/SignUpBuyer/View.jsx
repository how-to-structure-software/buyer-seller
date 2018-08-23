import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Form, FormGroup, Input, Alert,
} from 'reactstrap';

import './styles.css';

const SignUpForm = ({
  email, password, error, onEmailChange, onPasswordChange, handleSignUp,
}) => (
  <Form onSubmit={handleSignUp} className="form-centered mt-5">
    <div className="text-center mb-4">
      <h1 className="h3 mb-5 font-weight-normal">sign up buyer</h1>
    </div>
    <FormGroup>
      <Input
        value={email}
        onChange={onEmailChange}
        type="email"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        required
        autoFocus
      />
    </FormGroup>
    <FormGroup>
      <Input
        value={password}
        onChange={onPasswordChange}
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        required
      />
    </FormGroup>
    <Button className="btn btn-lg btn-primary btn-block" type="submit">sign up</Button>
    { error && <Alert className="mt-2" color="secondary">{error}</Alert> }
  </Form>
);

SignUpForm.propTypes = {
  error: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  handleSignUp: PropTypes.func.isRequired,
};

export default SignUpForm;
