import React from 'react';
import { Link } from 'react-router-dom';
import {
  Dropdown, DropdownToggle, DropdownMenu, Button,
  Alert,
} from 'reactstrap';
import PropTypes from 'prop-types';

import {
  LANDING, SIGN_UP_CUSTOMER, SIGN_UP_SELLER, ACCOUNT,
} from '../../Provider/Routes/index';
import SignInForm from './SignInForm/index';

const Header = ({
  error,
  isSignedIn, dropdownIsOpen, toggleDropdown, signOut,
}) => (
  <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 bg-white border-bottom box-shadow">
    <Link className="my-0 mr-md-auto link-unstyled" to={LANDING}>
      <h5 className="text-dark font-weight-normal">How To Structure Software (React)</h5>
    </Link>
    <nav className="my-2 my-md-0 mr-md-3">
      { !isSignedIn &&
      <Link className="btn btn-secondary btn-sm p-2 mr-2" to={SIGN_UP_CUSTOMER}>SignUp Buyer</Link>
      }
      { !isSignedIn &&
      <Link className="btn btn-secondary btn-sm p-2" to={SIGN_UP_SELLER}>SignUp Seller</Link>
      }
      { !isSignedIn && (
      <Dropdown className="p-2 d-inline" isOpen={dropdownIsOpen} toggle={toggleDropdown}>
        <DropdownToggle caret>
            Login
        </DropdownToggle>
        <DropdownMenu right className="" style={{ minWidth: '300px' }}>
          <SignInForm />
        </DropdownMenu>
      </Dropdown>
      )}
      { isSignedIn && (
      <div>
        <Link to={ACCOUNT} className="btn btn-secondary btn-sm p-2 mr-2">My Account</Link>
        <Button className="btn btn-secondary btn-sm p-2" onClick={signOut}>Logout</Button>
      </div>
      )}
    </nav>
    { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }
  </header>
);

Header.propTypes = {
  error: PropTypes.string.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  dropdownIsOpen: PropTypes.bool.isRequired,
  toggleDropdown: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Header;
