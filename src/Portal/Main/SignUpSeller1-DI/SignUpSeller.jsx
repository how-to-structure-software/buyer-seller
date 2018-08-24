import React, { Component } from 'react';

import ChoosePackage from './ChoosePackage';
import ChooseLogin from './ChooseLogin';
import Checkout from './Checkout';
import Dependency from './Dependency';


class SignUpSeller extends Component {
  constructor(props) {
    super(props);
    this.updateCurrentStep = this.updateCurrentStep.bind(this);
    this.state = {
      current: 0,
      sharedDependency: new Dependency(this.updateCurrentStep),
    };
  }

  updateCurrentStep(current) {
    this.setState({ current });
  }

  render() {
    const { sharedDependency, current } = this.state;
    switch (current) {
      case 0:
        return <ChoosePackage dependency={sharedDependency} />;
      case 1:
        return <ChooseLogin dependency={sharedDependency} />;
      case 2:
        return <Checkout dependency={sharedDependency} />;
      default:
        return null;
    }
  }
}

export default SignUpSeller;
