import React from 'react';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader';
import PropTypes from 'prop-types';

/* eslint-disable react/no-deprecated */
class PaypalButton extends React.Component {
  // scriptLoader gives you access to two properties: isScriptLoaded, isScriptLoadSucceed
  // => are passed as props to the react component
  constructor(props) {
    super(props);

    this.state = {
      showButton: false,
    };

    // bind React and ReactDOM to the window object
    // so that the 'paypal' object becomes available/visible inside this react Component
    window.React = React;
    window.ReactDOM = ReactDOM;
  }

  componentDidMount() {
    // injected by scriptLoader() at the bottom
    const { isScriptLoaded, isScriptLoadSucceed } = this.props;

    if (isScriptLoaded && isScriptLoadSucceed) {
      this.setState({ showButton: true });
    }
  }

  // In most cases the script isn’t loaded in the componentDidMount() lifecycle method.
  // This lifecycle method runs only once when the component is instantiated and it’s
  // not 100% certain to have the script loaded at this point in time. Therefore you
  // still have the componentWillReceiveProps() lifecycle method to check for the loaded script.
  componentWillReceiveProps(nextProps) {
    const { isScriptLoaded, isScriptLoadSucceed } = nextProps;

    /* eslint-disable react/destructuring-assignment */
    const isLoadedButWasntLoadedBefore =
      !this.state.showButton &&
      !this.props.isScriptLoaded &&
      isScriptLoaded;

    if (isLoadedButWasntLoadedBefore) {
      if (isScriptLoadSucceed) {
        this.setState({ showButton: true });
      }
    }
  }

  render() {
    const {
      disabled,
      total,
      currency,
      env,
      commit,
      client,
      onSuccess,
      onError,
      onCancel,
    } = this.props;

    const {
      showButton,
    } = this.state;

    /* eslint-disable no-undef */
    const payment = () => paypal.rest.payment.create(env, client, {
      transactions: [
        {
          amount: {
            total,
            currency,
          },
        },
      ],
    });

    const onAuthorize = (data, actions) => actions.payment.execute()
      .then(() => {
        const payed = {
          paid: true,
          cancelled: false,
          payerID: data.payerID,
          paymentID: data.paymentID,
          paymentToken: data.paymentToken,
          returnUrl: data.returnUrl,
        };

        onSuccess(payed);
      });

    return (
      <div>
        {showButton && !disabled && (
        /* eslint-disable react/jsx-no-undef */
        <paypal.Button.react
          env={env}
          client={client}
          commit={commit}
          payment={payment}
          onAuthorize={onAuthorize}
          onCancel={onCancel}
          onError={onError}
        />
        )}
      </div>
    );
  }
}

/* eslint-disable react/forbid-prop-types */
PaypalButton.propTypes = {
  isScriptLoaded: PropTypes.bool.isRequired,
  isScriptLoadSucceed: PropTypes.bool.isRequired,
  disabled: PropTypes.bool,
  total: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  env: PropTypes.string,
  commit: PropTypes.bool.isRequired,
  client: PropTypes.object,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

PaypalButton.defaultProps = {
  disabled: false,
  env: {},
  client: {},
};

export default scriptLoader('https://www.paypalobjects.com/api/checkout.js')(PaypalButton);

// props: {
//   sessionID: {
//     type: "string",
//       required: !1,
//     },
//   },
//   buttonSessionID: {
//     type: "string",
//       required: !1,
//     },
//   },
//   env: {
//     type: "string",
//       required: !1,
//     }
//   },
//   meta: {
//     type: "object",
//       required: !1,
//     }
//   },
//   stage: {
//     type: "string",
//       required: !1,
//     }
//   },
//   stageUrl: {
//     type: "string",
//       required: !1,
//     }
//   },
//   locale: {
//     type: "string",
//       required: !1,
//     }
//   },
//   client: {
//     type: "object",
//       required: !1,
//     }
//   },
//   payment: {
//     type: "function",
//       required: !1,
//     },
//   },
//   style: {
//     type: "object",
//       required: !1,
//     }
//   },
//   commit: {
//     type: "boolean",
//       required: !1
//   },
//   experience: {
//     type: "object",
//       required: !1,
//   },
//   fundingSource: {
//     type: "string",
//       required: !1,
//   },
//   onAuthorize: {
//     type: "function",
//       required: !0,
//     }
//   },
//   onAuth: {
//     type: "function",
//       required: !1,
//   },
//   accessToken: {
//     type: "function",
//       required: !1
//   },
//   onCancel: {
//     type: "function",
//       required: !1,
//     }
//   },
//   init: {
//     type: "function",
//       required: !1,
//   ,
//   onClose: {
//     type: "function",
//       required: !1,
//     }
//   },
//   onError: {
//     type: "function",
//       required: !1,
//   },
//   fallback: {
//     type: "function",
//       required: !1,
//     }
//   },
//   logLevel: {
//     type: "string",
//       required: !1,
//   },
//   supplement: {
//     type: "object",
//       required: !1,
//   },
//   test: {
//     type: "object",
//       required: !1,
//     }
//   }
// },
