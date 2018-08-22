import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from './Show';
import { auth, firestore } from '../../../../../Provider/Firebase';

const INITIAL_STATE = {
  error: '',
  userID: '',
  title: '',
  description: '',
  service: '',
  shoeSize: '',
  mostImportant: '',
  processID: '',
  messages: [],
};

const subscriptions = [];

class ShowEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.getUserRole = this.getUserRole.bind(this);
    this.getProcessID = this.getProcessID.bind(this);
    this.subscribeToRequest = this.subscribeToRequest.bind(this);
    this.subscribeToChatMessages = this.subscribeToChatMessages.bind(this);
    this.onNewMessage = this.onNewMessage.bind(this);
  }

  componentDidMount() {
    const { match: { params: { requestID } } } = this.props;
    const that = this;
    subscriptions.push(auth.onAuthStateChanged(user => {
      if (user) {
        const userID = user.uid;
        that.setState({ userID });
        that.subscribeToRequest(requestID);
        that.subscribeToChatMessages(requestID);
        that.getUserRole(userID)
          .then(userRole => that.setState({ userRole }));
        that.getProcessID(requestID)
          .then(processID => that.setState({ processID }));
      }
    }));
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  getUserRole(userID) {
    return firestore
      .collection('users')
      .doc(userID)
      .get()
      .then(docRef => docRef.data().role);
  }

  getProcessID(requestID) {
    return firestore
      .collection('processes')
      .where('request', '==', requestID)
      .get()
      .then(querySnap => querySnap.docs[0].data().ID);
  }

  subscribeToRequest(requestID) {
    const that = this;
    return subscriptions.push(
      firestore
        .collection('requests')
        .doc(requestID)
        .onSnapshot(docSnap => {
          if (docSnap.exists) {
            const {
              title, description, service, shoeSize, mostImportant,
            } = docSnap.data();
            that.setState({
              title, description, service, shoeSize, mostImportant,
            });
          } else {
            that.setState({ error: 'Request could not be found!' });
          }
        }),
    );
  }

  subscribeToChatMessages(requestID) {
    const that = this;
    return subscriptions.push(
      firestore.collection('chats')
        .where('request', '==', requestID)
        .onSnapshot(querySnap => {
          let chat;
          querySnap.forEach(docSnap => { chat = docSnap.data(); });
          if (chat) {
            const messages = chat.messages || [];
            that.setState({ messages });
          }
        }),
    );
  }

  onNewMessage(text) {
    const that = this;
    const { match: { params: { requestID } } } = this.props;
    const { userID, userRole, messages } = this.state;

    const updateLocalState = () => {
      messages.push({
        text,
        role: userRole,
        timestamp: (new Date()).getTime(),
      });
      that.setState({ messages });
    };

    const lookupChatID = () => firestore
      .collection('chats')
      .where('request', '==', requestID)
      .get()
      .then(querySnap => {
        let chatID;
        if (!querySnap.empty) {
          chatID = querySnap.docs[0].id;
        }
        return Promise.resolve(chatID);
      });

    const createChatIfNotExists = id => {
      if (id) {
        return Promise.resolve(id);
      }
      return firestore.collection('chats').add({})
        .then(docRef => {
          const chatID = docRef.id;
          const data = {
            ID: chatID,
            request: requestID,
          };
          const updateChat = () => firestore
            .collection('chats')
            .doc(chatID)
            .update(data);
          const returnChatID = () => Promise.resolve(chatID);

          return Promise.resolve()
            .then(updateChat)
            .then(returnChatID);
        });
    };


    const getChatID = () => Promise.resolve()
      .then(lookupChatID)
      .then(createChatIfNotExists);

    const addMessage = chatID => {
      const message = {
        text,
        owner: userID,
        role: userRole,
        timestamp: (new Date()).getTime(),
      };
      return firestore
        .runTransaction(transaction => {
          const document = firestore.collection('chats').doc(chatID);
          return transaction
            .get(document)
            .then(doc => {
              if (!doc.get('messages')) {
                transaction.update(document, { messages: [message] });
              } else {
                const serverMessages = doc.get('messages');
                serverMessages.push(message);
                transaction.update(document, { messages: serverMessages });
              }
            });
        });
    };

    // FLOW:
    // get chatID
    //   create chat if not exists
    // add message
    //   read messages
    //     create with first element if not exists
    //     add message and update
    Promise.resolve()
      .then(updateLocalState)
      .then(getChatID)
      .then(addMessage)
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    const {
      error, title, description, messages, userRole, processID,
      service, shoeSize, mostImportant,
    } = this.state;
    return (
      <Show
        error={error}
        title={title}
        description={description}
        service={service}
        shoeSize={shoeSize}
        mostImportant={mostImportant}
        messages={messages}
        processID={processID}
        onNewMessage={this.onNewMessage}
        canCreateOffer={userRole === 'seller'}
      />
    );
  }
}

ShowEnhanced.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      requestID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowEnhanced;
