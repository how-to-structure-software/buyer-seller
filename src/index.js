import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './Interior/registerServiceWorker';
import App from './Portal';
import store from './Provider/Redux';

//
// mount react into DOM
//

/* eslint-disable react/jsx-filename-extension */
const element = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);
const target = document.getElementById('root');

ReactDOM.render(element, target);

//
// service worker
//

registerServiceWorker();
