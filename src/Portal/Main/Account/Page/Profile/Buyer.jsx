import React from 'react';

import PasswordChange from './PasswordChange';

const Buyer = () => (
  <div>
    <div className="row">
      <div className="col-md-12">
        <h4>password</h4>
        <hr />
      </div>
    </div>
    <div className="row">
      <PasswordChange />
    </div>
  </div>
);

Buyer.propTypes = {

};

export default Buyer;
