import { combineReducers } from 'redux';

import userReducer from './user.redux';

//combineReducer is a function from the redux library where we define in one big state object, all the slices of the states from different reducers
//this function takes an object of functions (reducers)
export default combineReducers({
    user: userReducer
});