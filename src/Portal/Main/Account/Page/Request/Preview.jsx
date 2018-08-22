import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SHOW_REQUEST } from '../../../../../Provider/Routes';

/* eslint-disable react/no-array-index-key */
const Preview = ({
  title, description, requestID,
}) => (
  <div className="container">
    <div className="row">
      Titel: {title}
    </div>
    <div className="row">
      Description: {description.substring(0, 200).split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
    </div>
    <div className="row">
      <Link className="btn btn-secondary m-1" to={SHOW_REQUEST.replace(':requestID', requestID)}>Show request</Link>
    </div>
  </div>
);

Preview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  requestID: PropTypes.string.isRequired,
};

export default Preview;
