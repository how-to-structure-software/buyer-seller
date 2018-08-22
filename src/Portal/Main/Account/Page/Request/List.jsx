import React from 'react';
import PropTypes from 'prop-types';

import Preview from './Preview';

const Request = ({
  requests,
}) => (
  <div>

    <div className="row">
      { requests && requests.map(request => (
        <div className="card col-md-12" key={request.ID}>
          <div className="card-body">
            <Preview
              title={request.title}
              description={request.description}
              requestID={request.ID}
            />
          </div>
        </div>
      ))}
    </div>

  </div>
);

/* eslint-disable react/forbid-prop-types */
Request.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      ID: PropTypes.string,
    }).isRequired,
  ).isRequired,
};

export default Request;
