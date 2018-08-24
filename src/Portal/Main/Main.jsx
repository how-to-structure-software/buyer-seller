import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  PUBLIC_PROFILE, SEARCH,
  SIGN_UP_SELLER, SIGN_UP_CUSTOMER, PASSWORD_FORGET,
} from '../../Provider/Routes';
import Search from './Search';
import PublicProfile from './PublicProfile';
import SignUpSeller from './SignUpSeller1-DI';
import SignUpBuyer from './SignUpBuyer';
import PasswordForget from './PasswordForget';
import Account from './Account';

const Main = () => (
  <div>
    <Switch>
      <Route exact path={SEARCH} component={Search} />
      <Route exact path={PUBLIC_PROFILE} component={PublicProfile} />
      <Route exact path={SIGN_UP_SELLER} component={SignUpSeller} />
      <Route exact path={SIGN_UP_CUSTOMER} component={SignUpBuyer} />
      <Route exact path={PASSWORD_FORGET} component={PasswordForget} />
      <Route exact path={PUBLIC_PROFILE} component={PublicProfile} />
      <Route component={Account} />
    </Switch>
  </div>
);

export default Main;
