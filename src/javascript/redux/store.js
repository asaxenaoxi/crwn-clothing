import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';

import rootReducer from './root-reducer';

/*this is an array of middlewares we want to intercept our actions before they goto rootReducer*/
const middlewares = [logger];


/*const store = createStore(rootReducer, applyMiddleware(logger)); <- will also work but its easy to create array and just update array with middlewares*/
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

/*its the persisted version of the store, this will become the new provider which the application will use */
export const persistor = persistStore(store);

/*you do not need to pass persistor but just in case we ever need it in future. it basically is the persisted version of the store in local storage*/
//export default store;
export default {store, persistor};