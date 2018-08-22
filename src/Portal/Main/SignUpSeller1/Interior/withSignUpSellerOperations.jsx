import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as ActionCreators from '../Provider/Redux';
import * as Operations from './Operations';

const withSignUpSellerOperations = Component => {
  /* eslint-disable react/prefer-stateless-function */
  class WithSignUpSellerOperations extends React.Component {
    render() {
      return (
        <Component {...this.props} {...Operations} />
      );
    }
  }

  const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

  return connect(null, mapDispatchToProps)(WithSignUpSellerOperations);
};

export default withSignUpSellerOperations;
