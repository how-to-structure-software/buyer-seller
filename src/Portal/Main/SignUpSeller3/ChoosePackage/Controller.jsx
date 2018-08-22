import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ChoosePackage from './ChoosePackage';
import Dependency from '../Dependency';

class Controller extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  onSelect(price) {
    const { dependency } = this.props;
    return e => {
      e.preventDefault();
      dependency.price = price;
      dependency.goToNextStep();
    };
  }

  render() {
    return (
      <ChoosePackage onSelect={this.onSelect} />
    );
  }
}

Controller.propTypes = {
  dependency: PropTypes.instanceOf(Dependency).isRequired,
};

export default Controller;
