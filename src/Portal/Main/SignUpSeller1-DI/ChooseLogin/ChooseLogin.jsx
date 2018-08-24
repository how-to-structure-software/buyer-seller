import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Input, Button, Alert,
} from 'reactstrap';

import './styles.css';

const ChooseLogin = ({
  error, email, password, onEmailChange, onPasswordChange, onSubmit,
}) => (
  <div>
    <Form onSubmit={onSubmit} className="form-centered mt-5">
      <div className="text-center mb-4">
        <h1 className="h3 mb-5 font-weight-normal">Choose Email and Password</h1>
      </div>
      <FormGroup>
        <Input
          value={email}
          onChange={onEmailChange}
          type="email"
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
          className="form-control"
          placeholder="Password"
          required
        />
      </FormGroup>
      <Button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</Button>
      { error && <Alert className="mt-2" color="secondary">{error}</Alert> }
    </Form>
  </div>
);


ChooseLogin.propTypes = {
  error: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ChooseLogin;
