import React from 'react';

import Page from './Page';
import Menu from './Menu';

import './styles.scss';

const Account = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="menuCol mr-3">
        <Menu />
      </div>
      <div className="pageCol">
        <Page />
      </div>
    </div>
  </div>
);

Menu.propTypes = {

};

export default Account;
