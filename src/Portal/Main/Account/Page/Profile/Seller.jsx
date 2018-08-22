import React from 'react';

import PasswordChange from './PasswordChange';
import SellerUserData from './SellerUserData';
import SellerProfile from './SellerProfile';

const Seller = () => (
  <div className="">
    <div className="row">
      <div className="col-md-12">
        <h4>password</h4>
        <hr />
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <PasswordChange />
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <h4>User Data</h4>
        <hr />
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <SellerUserData />
      </div>
    </div>


    <div className="row">
      <div className="col-md-12">
        <h4>Profile</h4>
        <hr />
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <SellerProfile />
      </div>
    </div>

  </div>
);

Seller.propTypes = {
};

Seller.defaultProps = {
};

export default Seller;
