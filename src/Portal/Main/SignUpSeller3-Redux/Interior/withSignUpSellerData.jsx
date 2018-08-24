import React from 'react';
import { connect } from 'react-redux';

const withSignUpSellerData = Component => {
  /* eslint-disable react/prefer-stateless-function */
  class WithSignUpSellerData extends React.Component {
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  const mapStateToProps = state => ({
    ...state.signUpSellerState,
  });

  return connect(mapStateToProps, null)(WithSignUpSellerData);
};

export default withSignUpSellerData;
