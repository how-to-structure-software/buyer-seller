import React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  ACCOUNT,
  WATCHLIST,
  NEW_REQUEST, REQUESTS, SHOW_REQUEST,
  NEW_OFFER, SHOW_OFFER, OFFERS,
  NEW_CONTRACT, SHOW_CONTRACT, CONTRACTS,
} from '../../../../Provider/Routes';
import Profile from './Profile';
import Watchlist from './Watchlist';
import { ListRequests, NewRequest, ShowRequest } from './Request';
import { NewOffer, ShowOffer, ListOffers } from './Offer';
import { NewContract, ShowContract, ListContracts } from './Contract';

const Page = () => (
  <div className="card">
    <div className="card-body">
      <Switch>
        <Route path={ACCOUNT} component={Profile} />
        <Route path={WATCHLIST} component={Watchlist} />

        <Route path={NEW_REQUEST} component={NewRequest} />
        <Route path={SHOW_REQUEST} component={ShowRequest} />
        <Route path={REQUESTS} component={ListRequests} />

        <Route path={NEW_OFFER} component={NewOffer} />
        <Route path={SHOW_OFFER} component={ShowOffer} />
        <Route path={OFFERS} component={ListOffers} />

        <Route path={NEW_CONTRACT} component={NewContract} />
        <Route path={SHOW_CONTRACT} component={ShowContract} />
        <Route path={CONTRACTS} component={ListContracts} />
      </Switch>
    </div>
  </div>
);

Page.propTypes = {

};

export default Page;
