import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Show from './Show';
import { auth, firestore } from '../../../../../Provider/Firebase/index';

const INITIAL_STATE = {
  error: '',
  userID: '',
  userRole: '',
  processID: '',
  contractID: '',
  title: '',
  description: '',
  milestones: [],
};

const subscriptions = [];

class ShowEnhanced extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

    this.getProcessID = this.getProcessID.bind(this);
    this.getUserRole = this.getUserRole.bind(this);
    this.subscribeToContract = this.subscribeToContract.bind(this);
    this.subscribeToUser = this.subscribeToUser.bind(this);
    this.onUserLogin = this.onUserLogin.bind(this);
    this.onContractChange = this.onContractChange.bind(this);
  }

  componentDidMount() {
    const { match: { params: { contractID } } } = this.props;
    this.subscribeToUser(this.onUserLogin);
    this.subscribeToContract(contractID, this.onContractChange);
  }

  componentWillUnmount() {
    subscriptions.forEach(unsubscribe => unsubscribe());
  }

  subscribeToUser(onUserLoggedIn) {
    subscriptions.push(
      auth.onAuthStateChanged(user => {
        if (user) {
          const userID = user.uid;
          onUserLoggedIn(userID);
        }
      }),
    );
  }

  subscribeToContract(contractID, onContractChange) {
    subscriptions.push(
      firestore.collection('contracts')
        .doc(contractID)
        .onSnapshot(docSnap => {
          const contract = { ...docSnap.data() };
          onContractChange(contract);
        }),
    );
  }

  async getProcessID(contractID) {
    return firestore
      .collection('processes')
      .where('contract', '==', contractID)
      .get()
      .then(querySnap => querySnap.docs[0].get('ID'));
  }

  getUserRole(userID) {
    return firestore
      .collection('users')
      .doc(userID)
      .get()
      .then(docRef => docRef.get('role'));
  }

  onContractChange(contract) {
    let milestones = [];
    if (contract.milestones) {
      milestones = Object.keys(contract.milestones).map(key => contract.milestones[key]);
    }
    this.setState({
      milestones,
      title: contract.title,
      description: contract.description,
    });
  }

  async onUserLogin(userID) {
    const { match: { params: { contractID } } } = this.props;
    const processID = this.getProcessID(contractID);
    const userRole = this.getUserRole(userID);
    this.setState({
      userRole: (await userRole),
      processID: (await processID),
    });
  }

  render() {
    const {
      error, title, description, processID, contractID, userRole, milestones,
    } = this.state;

    return (
      <Show
        error={error}
        title={title}
        description={description}
        processID={processID}
        contractID={contractID}
        milestones={milestones}
        canCreateVideo={userRole === 'seller'}
        canEditMilestones={userRole === 'seller'}
      />
    );
  }
}

ShowEnhanced.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      contractID: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowEnhanced;
