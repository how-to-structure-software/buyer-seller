import React from 'react';
import PropTypes from 'prop-types';
import { Button, Alert } from 'reactstrap';

import WatchlistPreview from './WatchlistPreview';

const Watchlist = ({
  error, success, profiles, clearWatchlist, clearElementFromWatchlist,
}) => (
  <div>
    <div className="row">
      <div className="col-md-12">
        { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }
        { success && <Alert className="d-block mt-2" color="secondary">{success}</Alert> }
      </div>
    </div>
    <div className="row">
      { profiles.length ? <Button className="m-1" onClick={clearWatchlist}>clear Watchlist</Button> : null}

      { profiles && profiles.map(profile => (
        <div className="card col-md-12" key={profile.ID}>
          <div className="card-body">
            <div className="row">
              <WatchlistPreview
                name={profile.name}
                description={profile.description}
                profileID={profile.ID}
                clearFromWatchlist={clearElementFromWatchlist(profile.ID)}
              />
            </div>
          </div>
        </div>
      ))}

    </div>

  </div>
);

/* eslint-disable react/forbid-prop-types */
Watchlist.propTypes = {
  error: PropTypes.string,
  success: PropTypes.string,
  clearWatchlist: PropTypes.func.isRequired,
  clearElementFromWatchlist: PropTypes.func.isRequired,
  profiles: PropTypes.array,
};

Watchlist.defaultProps = {
  error: '',
  success: '',
  profiles: [],
};

export default Watchlist;
