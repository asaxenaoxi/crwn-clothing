import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import { Provider } from 'react-redux';

import './index.css';
import App from './App';

import { store, persistor } from './javascript/redux/store';

/*All the imports required for persisting redux store to local storage*/
import { PersistGate } from 'redux-persist/integration/react';

/*Redux Provider component takes redux master state store as a parameter which is then available with every component in the app.*/
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <BrowserRouter>
    <PersistGate persistor={persistor}>
      <App/>
    </PersistGate>
  </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

