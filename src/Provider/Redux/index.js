import {
  createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

import signUpSellerReducer from '../../Portal/Main/SignUpSeller3-Redux/Provider/Redux';

const store = createStore(
  combineReducers({
    signUpSellerState: signUpSellerReducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

export default store;
