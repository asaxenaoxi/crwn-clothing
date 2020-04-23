import { createSelector } from 'reselect';

/*Default values for the User Reducer State Object*/
const INITIAL_STATE = 
{
    currentUser: null
}

export const UserActionTypes = 
{
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (prevState = INITIAL_STATE, action) =>
{
    switch(action.type)
    {
        case UserActionTypes.SET_CURRENT_USER :
        {
            /*return a new object based on this action item*/
            return (
            {
                ...prevState,
                currentUser: action.payload
            });
        }
        default:
            return prevState;
    }
}

export const setCurrentUser = (user) => 
{
    return (
        {
            type: UserActionTypes.SET_CURRENT_USER,
            payload: user
        }
    );
}

/*input selector*/
const selectUser = (reduxState) => reduxState.user;
export const selectCurrentUser = createSelector([selectUser], (user)=>user.currentUser);

export default userReducer;