import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chat from './Chat';

const INITIAL_STATE = {
  text: '',
};

class ChatEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleNewMessage = this.handleNewMessage.bind(this);
  }

  handleNewMessage(e) {
    e.preventDefault();
    const { text } = this.state;
    const { onNewMessage } = this.props;
    onNewMessage(text);
    this.setState({ text: '' });
  }

  render() {
    const { text } = this.state;
    const { messages } = this.props;
    return (
      <Chat
        messages={messages}
        text={text}
        onTextChange={e => this.setState({ text: e.target.value })}
        onNewMessage={this.handleNewMessage}
      />
    );
  }
}

ChatEnhanced.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      role: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onNewMessage: PropTypes.func.isRequired,
};

export default ChatEnhanced;
