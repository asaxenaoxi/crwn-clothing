import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

/*this is an array of middlewares we want to intercept our actions before they goto rootReducer*/
const middlewares = [logger];

/*const store = createStore(rootReducer, applyMiddleware(logger)); <- will also work but its easy to create array and just update array with middlewares*/
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;