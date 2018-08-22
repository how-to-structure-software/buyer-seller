import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';

/* eslint-disable react/no-array-index-key */
const Show = ({
  error, title, description,
}) => (
  <div className="container">
    <div>

      <div className="row">
        <div className="col-md-12">
          <h4>contract</h4>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="container">
            <div className="row">
              title: {title}
            </div>
            <div className="row">
              description: {description.substring(0, 200).split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
            </div>
          </div>
        </div>
      </div>

      { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }

    </div>
  </div>
);

Show.propTypes = {
  error: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Show;
