import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { SHOW_OFFER } from '../../../../../Provider/Routes';

/* eslint-disable react/no-array-index-key */
const Preview = ({
  title, description, offerID,
}) => (
  <div className="container">
    <div className="row">
      titel: {title}
    </div>
    <div className="row">
      Description: {description.substring(0, 200).split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
    </div>
    <div className="row">
      <Link className="btn btn-secondary m-1" to={SHOW_OFFER.replace(':offerID', offerID)}>show offer</Link>
    </div>
  </div>
);

Preview.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  offerID: PropTypes.string.isRequired,
};

export default Preview;
