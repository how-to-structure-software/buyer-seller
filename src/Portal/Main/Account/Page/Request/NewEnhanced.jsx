import React, { Component } from 'react';
import PropTypes from 'prop-types';

import New from './New';
import { auth as firebaseAuth, firestore } from '../../../../../Provider/Firebase';
import { REQUESTS } from '../../../../../Provider/Routes';

const INITIAL_STATE = {
  error: '',
  userID: '',
  service: '',
  shoeSize: '',
  title: '',
  description: '',
  mostImportant: '',
};

const subscriptions = [];

class NewEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.onMostImportantChange = this.onMostImportantChange.bind(this);
    this.onShoeSizeChange = this.onShoeSizeChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const that = this;
    subscriptions.push(firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        that.setState({ userID: user.uid });
      }
    }));
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  handleChange(key) {
    const that = this;
    return e => {
      that.setState({ [key]: e.target.value });
    };
  }

  onMostImportantChange(mostImportant) {
    const that = this;
    return () => that.setState({ mostImportant });
  }

  onShoeSizeChange(shoeSize) {
    const that = this;
    return () => that.setState({ shoeSize });
  }

  handleNewRequest(e) {
    e.preventDefault();
    const that = this;
    const {
      userID,
      service, title, description, shoeSize, mostImportant,
    } = this.state;

    const { history, match: { params: { sellerID } } } = this.props;

    if (!userID || !sellerID) {
      this.setState({ error: `userID or sellerID is missing! userID: ${userID}, sellerID:${sellerID}` });
      return;
    }

    const requestData = {
      service,
      title,
      description,
      mostImportant,
      shoeSize,
      owner: userID,
    };

    const processData = {
      title,
      buyer: userID,
      seller: sellerID,
      status: 'request',
    };

    const createNewDocuments = () => Promise.all([
      firestore.collection('requests').add({}),
      firestore.collection('processes').add({}),
    ]);
    const getIDs = refs => Promise.resolve({ requestID: refs[0].id, processID: refs[1].id });
    const saveData = ({ requestID, processID }) => {
      const requestDoc = firestore.collection('requests').doc(requestID);
      const processDoc = firestore.collection('processes').doc(processID);
      return Promise.all([
        requestDoc.set(requestData),
        processDoc.set(processData),
        requestDoc.update({ ID: requestID }),
        processDoc.update({ ID: processID, request: requestID }),
      ]);
    };
    const redirectUser = () => history.push(REQUESTS);

    Promise.resolve()
      .then(createNewDocuments)
      .then(getIDs)
      .then(saveData)
      .then(redirectUser)
      .catch(err => that.setState({ error: err.message }));
  }

  render() {
    const {
      error, service, shoeSize, title, description,
      mostImportant,
    } = this.state;

    const isInvalid =
      service === '' ||
      shoeSize === '' ||
      mostImportant === '' ||
      shoeSize === '' ||
      title === '' ||
      description === '';

    return (
      <New
        error={error}
        service={service}
        shoeSize={shoeSize}
        title={title}
        description={description}
        mostImportant={mostImportant}
        onServiceChange={this.handleChange('service')}
        onShoeSizeChange={this.handleChange('shoeSize')}
        onTitleChange={this.handleChange('title')}
        onDescriptionChange={this.handleChange('description')}
        onMostImportantChange={this.onMostImportantChange}

        isInvalid={isInvalid}
        handleNewRequest={this.handleNewRequest}
      />
    );
  }
}

/* eslint-disable react/forbid-prop-types */
NewEnhanced.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default NewEnhanced;
