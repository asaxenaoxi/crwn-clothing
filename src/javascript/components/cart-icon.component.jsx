import React from 'react';
import {connect} from 'react-redux';
import {toggleCartHidden, selectCartItemsCount} from '../redux/cart.redux';
/*import {toggleCartHidden} from '../redux/cart.redux';*/

import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { createStructuredSelector } from 'reselect';

import '../../styles/cart-icon.styles.scss';

const CartIcon = (props) => 
(
        <div className='cart-icon' onClick={props.toggleCartHidden}>
            <ShoppingIcon className='shopping-icon'></ShoppingIcon>
            <span className='item-count'>{props.itemCount}</span>
        </div>
)

const mapDispatchToProps = (dispatch) =>(
    {
        toggleCartHidden: () => dispatch(toggleCartHidden())
    }
);

/*const mapStateToProps = ({cart: {cartItems}}) => //This is before using selector to state properties */
/*const mapStateToProps = (reduxState) =>
{
    console.log("cart-icon::mapStateToProps(item count)");
    return(
        {
            //instead of running a for loop and add the quantities, reduce() function helps return a single return value and in the callback
            //function 
            //itemCount: reduxState.cart.cartItems.reduce((acc, item) => acc+item.quantity, 0) //This is before using selectors to memoize / cache 
                                                                            //the output to prevent unnecessary rerenders
            itemCount: selectCartItemsCount(reduxState)
        }
    );
}*/
/*using reselect lib createStructured*/
const mapStateToProps = createStructuredSelector(
    {
        itemCount: selectCartItemsCount
    }
);

/*this will add toggleCartHidden as a property to CartIcon*/
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);