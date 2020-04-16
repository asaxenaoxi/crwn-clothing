const INITIAL_STATE = 
{
    hidden: true
};

const CartActionTypes =
{
    TOGGLE_CART_HIDDEN: 'TOGGLE_CART_HIDDEN'
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

export default cartReducer;