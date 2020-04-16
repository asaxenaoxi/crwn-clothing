import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import store from './javascript/redux/store';

//Redux Provider component takes redux master state store as a parameter which is then available with every component in the app.

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

