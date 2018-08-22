import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  WATCHLIST, REQUESTS, OFFERS, CONTRACTS, SEARCH, ACCOUNT,
} from '../../../../Provider/Routes/index';

import './styles.scss';

const Menu = ({ pathname }) => (
  <div className="">
    <ListGroup className="override-active-listgroupitem-color">
      {pathname === ACCOUNT ?
        <ListGroupItem active>My Account</ListGroupItem> :
        <ListGroupItem><Link to={ACCOUNT}>My Account</Link></ListGroupItem>
      }
      {pathname === WATCHLIST ?
        <ListGroupItem active>My Watchlist</ListGroupItem> :
        <ListGroupItem><Link to={WATCHLIST}>My Watchlist</Link></ListGroupItem>
      }
      {pathname === REQUESTS ?
        <ListGroupItem active>Buyer Requests</ListGroupItem> :
        <ListGroupItem><Link to={REQUESTS}>Buyer Requests</Link></ListGroupItem>
      }
      {pathname === OFFERS ?
        <ListGroupItem active>Seller Offers</ListGroupItem> :
        <ListGroupItem><Link to={OFFERS}>Seller Offers</Link></ListGroupItem>
      }
      {pathname === CONTRACTS ?
        <ListGroupItem active>My Contracts</ListGroupItem> :
        <ListGroupItem><Link to={CONTRACTS}>My Contracts</Link></ListGroupItem>
      }
      {pathname === SEARCH ?
        <ListGroupItem active>Let&#39;s Search</ListGroupItem> :
        <ListGroupItem><Link to={SEARCH}>Let&#39;s Search</Link></ListGroupItem>
      }
    </ListGroup>
  </div>
);

Menu.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Menu;
