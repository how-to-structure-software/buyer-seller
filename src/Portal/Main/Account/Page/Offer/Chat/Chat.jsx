import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

/* eslint-disable react/no-array-index-key */
const Chat = ({
  messages, text, onTextChange, onNewMessage,
}) => (
  <div>

    {messages && messages.map(message => (
      <div className="row" key={message.timestamp}>
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <div>Datum: {message.timestamp}</div>
                  <div>Author: {message.role}</div>
                  <div><br />
                    {message.text.substring(0, 1000).split('\n').map((item, key) => <span key={key}>{item}<br /></span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}

    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-12">
                <textarea className="form-control" value={text} onChange={onTextChange} />
                <Button className="mt-3" onClick={onNewMessage}>Senden</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
);

Chat.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      role: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  text: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired,
  onNewMessage: PropTypes.func.isRequired,
};

export default Chat;
