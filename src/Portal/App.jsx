import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'holderjs/holder'; // offline capabilities: https://stackoverflow.com/q/47953732/5011904

import './App.css';

const App = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
);

export default App;
