import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { PUBLIC_PROFILE } from '../../../../../Provider/Routes';

/* eslint-disable react/no-array-index-key */
const WatchlistPreview = ({
  name, description, profileID, clearFromWatchlist,
}) => (
  <div className="container">
    <div className="row">
      <h2>{name}</h2>
    </div>
    <div className="row">
      {description.substring(0, 200).split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
    </div>
    <div className="row">
      <Button className="m-1" onClick={clearFromWatchlist}>remove from watchlist</Button>
      <Link className="btn btn-secondary m-1" to={PUBLIC_PROFILE.replace(':profileID', profileID)}>visit profile</Link>
    </div>
  </div>
);

WatchlistPreview.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  profileID: PropTypes.string.isRequired,
  clearFromWatchlist: PropTypes.func.isRequired,
};

export default WatchlistPreview;
