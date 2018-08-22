import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

import { NEW_CONTRACT } from '../../../../../Provider/Routes';
import Chat from './Chat';

/* eslint-disable react/no-array-index-key */
const Show = ({
  error, title, description, price, messages, processID, onNewMessage, canCreateContract,
}) => (
  <div>

    <div className="row">
      <div className="col-md-12">
        <h4>offer</h4>
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
          <div className="row">
            price: {price}
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

    {canCreateContract ? <Link className="btn btn-secondary mt-3" to={NEW_CONTRACT.replace(':processID', processID)}>accept offer</Link> : null}

    { error && <Alert className="d-block mt-2" color="secondary">{error}</Alert> }

  </div>
);

Show.propTypes = {
  error: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  processID: PropTypes.string.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      role: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onNewMessage: PropTypes.func.isRequired,
  canCreateContract: PropTypes.bool.isRequired,
};

export default Show;
