import { createSelector } from 'reselect';

const INITIAL_STATE = 
{
    hidden: true,
    cartItems: []
};

const CartActionTypes =
{
    TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN',
    ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART'
}

//Remember: rootReducer sends just the cart state object to this call and not the root state
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
            //const 
            return (
                        {
                            ...prevState,
                            //cartItems: [...prevState.cartItems, action.payload]
                            cartItems: updateItemOnCart(prevState.cartItems, action.payload)
                        }
                    );
        }            
        default:
            return prevState;
    }
}

export const toggleCartHidden = () => 
{
    return (
                {
                    type: CartActionTypes.TOGGLE_CART_HIDDEN
                }
            );
}

export const addItemToCart = (item) =>
{
    return (
                {
                    type: CartActionTypes.ADD_ITEM_TO_CART,
                    payload: item
                }
            );
}

export const updateItemOnCart = (currentCartItems, itemToAdd) =>
{

    const existingCartItem = currentCartItems.find((cartItem) => cartItem.id === itemToAdd.id);

    if(existingCartItem)
    {
        //Since we know the item we are trying to add has been found and we have a return a new [] so we iterate through the existing
        //array and pass the item as is to new array when IDs do not match and when they match, return a new object with values of the
        //old item along with updated quantity++
        return currentCartItems.map((item) => item.id === itemToAdd.id ? {...item, quantity: item.quantity + 1} : item);
    }

    //here since this item wasnt found, we create a new array as react wants new objects to decide to repaint components and to do do 
    //you spread all the currentCartItems arrya and then add this item with a new quantity field and assign it a value of 1
    return [...currentCartItems, {...itemToAdd, quantity: 1}];
}

/*****Cart Selector *****/
//This gets cart slice
const selectCart = (reduxState) => reduxState.cart;
//This get cartItems from cart slice
export const selectCartItems = createSelector([selectCart], (cart)=>cart.cartItems);
//This gets cartItem count by calculating it against the cartItems array and all of this cached
export const selectCartItemsCount = createSelector([selectCartItems], (cartItems) => cartItems.reduce((acc, item) => acc+item.quantity, 0));

export default cartReducer;