import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Form, FormGroup, Input, Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';

import { PASSWORD_FORGET } from '../../../Provider/Routes/index';
import './styles.scss';

const SignInForm = ({
  error, email, password,
  onEmailChange, onPasswordChange, handleSignIn,
  loginAsDemoBuyer, loginAsDemoSeller,
}) => (
  <Form className="pl-2 pr-2" onSubmit={handleSignIn}>
    <FormGroup>
      <Input
        value={email}
        onChange={onEmailChange}
        className="mb-md-3"
        type="email"
        name="email"
        placeholder="Email address"
        required
        autoFocus
      />
      <Input
        value={password}
        onChange={onPasswordChange}
        className=""
        type="password"
        name="password"
        placeholder="Password"
        required
      />
    </FormGroup>
    <div className="d-block clearfix">
      <Link className="text-dark link-unstyled" to={PASSWORD_FORGET}>Forgot your password?</Link>
      <Button className="float-right">Sign in</Button>
    </div>
    <div className="float-right">
      <button className="btn btn-link btn-sm" type="button" onClick={loginAsDemoBuyer}>Demo Buyer</button>
      <button className="btn btn-link btn-sm" type="button" onClick={loginAsDemoSeller}>Demo Seller</button>
    </div>
    {error && <Alert className="d-block mt-2" color="secondary">{error}</Alert>}
  </Form>
);

SignInForm.propTypes = {
  error: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  loginAsDemoBuyer: PropTypes.func.isRequired,
  loginAsDemoSeller: PropTypes.func.isRequired,
};

export default SignInForm;
