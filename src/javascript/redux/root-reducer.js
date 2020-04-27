import { combineReducers } from 'redux';

import userReducer from './user.redux';
import cartReducer from './cart.redux';
import directoryReducer from './directory.redux';
import shopReducer from './shop.redux';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; /*<= this points to local storage, session storage needs to point to another folder*/

/*This is the config to tell redux-persist to store on storage
key is the starting point and we want everything from root to store
storage is where it will be stored which from above import is the local storage
whitelist: is all the reducer we want to persist from the root reducer*/
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

/*combineReducer is a function from the redux library where we define in one big state object, all the slices of the states from different reducers
this function takes an object of functions (reducers)*/
const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
});

export default persistReducer(persistConfig, rootReducer);