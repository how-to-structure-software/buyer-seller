import React from 'react';
import PropTypes from 'prop-types';

const Steps = ({ current, children, ...restProps }) => {
  const reducer = (acc, child, index) => {
    if (child && index === current) {
      Object.assign(acc, child);
    }
    return acc;
  };
  const currentChild = React.Children.toArray(children).reduce(reducer, {});
  return (
    <div {...restProps}>
      {currentChild}
    </div>
  );
};

/* eslint-disable react/forbid-prop-types */
Steps.propTypes = {
  current: PropTypes.number,
  children: PropTypes.array.isRequired,
};

Steps.defaultProps = {
  current: 0,
};

const Step = ({ ...props }) => (
  <div {...props} />
);

export {
  Steps,
  Step,
};

// inspiration: https://github.com/react-component/steps/blob/master/src/Steps.jsx
