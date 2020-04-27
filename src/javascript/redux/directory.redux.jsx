import { createSelector } from 'reselect';
import CONST_DS_MENU_ITEMS from '../data/directory-menu.data';

/*Default values for the User Reducer State Object*/
const INITIAL_STATE = 
{
    selections : CONST_DS_MENU_ITEMS
}

const directoryReducer = (prevState = INITIAL_STATE, action) =>
{
    switch(action.type)
    {
        default:
            return prevState;
    }
}

/*input selector*/
const selectDirectory = (reduxState) => reduxState.directory;
export const selectDirectoryMenu = createSelector([selectDirectory], (directory) => directory.selections);

export default directoryReducer;