import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

import { NEW_OFFER } from '../../../../../Provider/Routes';
import Chat from './Chat';

/* eslint-disable react/no-array-index-key */
const Show = ({
  error, title, description, messages, processID, onNewMessage, canCreateOffer,
  service, shoeSize, mostImportant,
}) => (
  <div>

    <div className="row">
      <div className="col-md-12">
        <h4>request</h4>
        <hr />
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <div className="container">
          <div className="row">
            titel: {title}
          </div>
          <div className="row">
            description: {description.substring(0, 200).split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
          </div>
          <div className="row">
            service: {service}
          </div>
          <div className="row">
            shoe size: {shoeSize}
          </div>
          <div className="row">
            most important: {mostImportant}
          </div>
        </div>
      </div>
    </div>

    <div className="row">
      <div className="col-md-12">
        <Chat
          messages={messages}
          onNewMessage={onNewMessage}
        />
        <hr />
      </div>
    </div>

    {canCreateOffer ? <Link className="btn btn-secondary mt-3" to={NEW_OFFER.replace(':processID', processID)}>new offer</Link> : null}

    { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }

  </div>
);

Show.propTypes = {
  error: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  shoeSize: PropTypes.string.isRequired,
  mostImportant: PropTypes.string.isRequired,
  processID: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      role: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onNewMessage: PropTypes.func.isRequired,
  canCreateOffer: PropTypes.bool.isRequired,
};

export default Show;
