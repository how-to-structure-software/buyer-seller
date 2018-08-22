import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from './Show';
import { auth, firestore } from '../../../../../Provider/Firebase';

const INITIAL_STATE = {
  error: '',
  userID: '',
  processID: '',
  title: '',
  description: '',
  price: '',
  messages: [],
};

const subscriptions = [];

class ShowEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.getUserRole = this.getUserRole.bind(this);
    this.getProcessID = this.getProcessID.bind(this);
    this.getProcessTitle = this.getProcessTitle.bind(this);
    this.subscribeToOffer = this.subscribeToOffer.bind(this);
    this.subscribeToChatMessages = this.subscribeToChatMessages.bind(this);
  }

  componentDidMount() {
    const { match: { params: { offerID } } } = this.props;
    const that = this;
    subscriptions.push(auth.onAuthStateChanged(user => {
      if (user) {
        const userID = user.uid;
        that.setState({ userID });
        this.getProcessTitle(offerID)
          .then(title => {
            that.subscribeToOffer(offerID, title);
            that.subscribeToChatMessages(offerID);
          });
        that.getUserRole(userID)
          .then(userRole => that.setState({ userRole }));
        that.getProcessID(offerID)
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

  getProcessID(offerID) {
    return firestore
      .collection('processes')
      .where('offer', '==', offerID)
      .get()
      .then(querySnap => querySnap.docs[0].data().ID);
  }

  subscribeToOffer(offerID, title) {
    const that = this;
    return subscriptions.push(
      firestore
        .collection('offers')
        .doc(offerID)
        .onSnapshot(docSnap => {
          if (docSnap.exists) {
            const { description, price } = docSnap.data();
            that.setState({
              title, description, price,
            });
          } else {
            that.setState({ error: 'Offer could not be found!' });
          }
        }),
    );
  }

  getProcessTitle(offerID) {
    return firestore
      .collection('processes')
      .where('offer', '==', offerID)
      .get()
      .then(querySnaps => querySnaps.docs[0].data().title);
  }

  subscribeToChatMessages(offerID) {
    const that = this;
    return subscriptions.push(
      firestore.collection('chats')
        .where('offer', '==', offerID)
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
    const { match: { params: { offerID } } } = this.props;
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
      .where('offer', '==', offerID)
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
            offer: offerID,
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
      error, title, description, price, processID, messages, userRole,
    } = this.state;
    return (
      <Show
        error={error}
        title={title}
        description={description}
        price={price}
        processID={processID}
        messages={messages}
        onNewMessage={this.onNewMessage}
        canCreateContract={userRole === 'buyer'}
      />
    );
  }
}

ShowEnhanced.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      offerID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowEnhanced;
