import { createSelector } from 'reselect';

const INITIAL_STATE = 
{
    hidden: true,
    cartItems: []
};

const CartActionTypes =
{
    TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
    CLEAR_ITEM_FROM_CART: 'CLEAR_ITEM_FROM_CART',
    REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART'
}

/*Remember: rootReducer sends just the cart state object to this call and not the root state*/
const cartReducer = (prevState = INITIAL_STATE, action) =>
{
    switch(action.type)
    {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return (
                        {
                            ...prevState,
                            hidden: !prevState.hidden
                        }
                    );
        case CartActionTypes.ADD_ITEM_TO_CART:
        {
            return (
                        {
                            ...prevState,
                            /*cartItems: [...prevState.cartItems, action.payload]*/
                            cartItems: utilityAddItemToCart(prevState.cartItems, action.payload)
                        }
                    );
        }            
        case CartActionTypes.REMOVE_ITEM_FROM_CART:
        {
            return (
                        {
                            ...prevState,
                            /*cartItems: [...prevState.cartItems, action.payload]*/
                            cartItems: utilityRemoveItemFromCart(prevState.cartItems, action.payload)
                        }
                    );
        }            
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
        {
            return (
                        {
                            ...prevState,
                            /*cartItems: [...prevState.cartItems, action.payload]*/
                            /*Here we are filtering all items that do not have the same ID as the item which we are trying to delete*/
                            cartItems: prevState.cartItems.filter((cartItem) => (cartItem.id !== action.payload.id))
                        }
                    );
        }            
        default:
            return prevState;
    }
}

/*Also an action func , will change name later*/
export const toggleCartHidden = () => 
{
    return (
                {
                    type: CartActionTypes.TOGGLE_CART_HIDDEN
                }
            );
}

/*Also an action func , will change name later*/
export const actionAddItemToCart = (item) =>
{
    return (
                {
                    type: CartActionTypes.ADD_ITEM_TO_CART,
                    payload: item
                }
            );
}

/*Also an action func*/
export const actionRemoveItemFromCart = (item) =>
{
    return (
                {
                    type: CartActionTypes.REMOVE_ITEM_FROM_CART,
                    payload: item
                }
            );
}

/*action func*/
export const actionClearItemFromCart = (item) =>
{
    return (
                {
                    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
                    payload: item
                }
            );
}

/*internal utility function to be uses by reducer*/
export const utilityAddItemToCart = (currentCartItems, itemToAdd) =>
{

    const existingCartItem = currentCartItems.find((cartItem) => cartItem.id === itemToAdd.id);

    if(existingCartItem)
    {
        /*Since we know the item we are trying to add has been found and we have a return a new [] so we iterate through the existing
        array and pass the item as is to new array when IDs do not match and when they match, return a new object with values of the
        old item along with updated quantity++*/
        return currentCartItems.map((item) => item.id === itemToAdd.id ? {...item, quantity: item.quantity + 1} : item);
    }

    /*here since this item wasnt found, we create a new array as react wants new objects to decide to repaint components and to do do 
    you spread all the currentCartItems arrya and then add this item with a new quantity field and assign it a value of 1*/
    return [...currentCartItems, {...itemToAdd, quantity: 1}];
}

export const utilityRemoveItemFromCart = (currentCartItems, itemToRemove) =>
{

    const existingCartItem = currentCartItems.find((cartItem) => cartItem.id === itemToRemove.id);

    if(existingCartItem)
    {
        if(existingCartItem.quantity > 1)
            return currentCartItems.map((item) => item.id === itemToRemove.id ? {...item, quantity: item.quantity - 1} : item);
        else
            return currentCartItems.filter((item) => (item.id !== itemToRemove.id));

    }

    return [...currentCartItems, {...itemToRemove, quantity: 1}];
}

/*****Cart Selector *****/
/*This gets cart slice*/
const selectCart = (reduxState) => reduxState.cart;
/*This get cartItems from cart slice*/
export const selectCartItems = createSelector([selectCart], (cart)=>cart.cartItems);

/*This gets cartItem count by calculating it against the cartItems array and all of this cached*/
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) => cartItems.reduce((acc, item) => acc+item.quantity, 0));

/*This gets cartItem total by calculating it against the cartItems array and all of this cached*/
export const selectCartItemsTotal = createSelector([selectCartItems], (cartItems) => cartItems.reduce((acc, item) => acc+(item.quantity*item.price), 0));

/*This gets cartItem total by calculating it against the cartItems array and all of this cached*/
export const select = createSelector([selectCartItems], (cartItems) => cartItems.reduce((acc, item) => acc+(item.quantity*item.price), 0));

export const selectHidden = createSelector([selectCart], (cart)=>cart.hidden);

export default cartReducer;


/*Steps to follow to make changes*/
/*
How to create an action item: This goes into mapDispatchToProp functions
1. Add a action type in the enum
2. In the reducer switch to take action
3. create a new dispatch Action function to create the action object to give to reducer. 
This function will be called by the components on call action 
4. Optionally need to create the utility function if its complicated action deserving a separate func

5. Import the action function in the component
6. pass it to mapDispatchToProps and then  
7. destructure it from the props or not but use it depending on that props. or directly
*/

/*
How to create an getter function from redux state using selector: This goes into mapStateToProps functions of each component
1. create a new selector using createSelector which will take another selector or an array 
of selectors and a function which works on the items and returns the final answer to be 
returned by this getter.
*/