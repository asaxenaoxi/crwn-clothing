import React from 'react';
import { connect } from 'react-redux';
import { actionClearItemFromCart, actionAddItemToCart, actionRemoveItemFromCart } from '../redux/cart.redux';

import '../../styles/checkout-item.styles.scss';

/**********VERY CRITICAL TO REMEMBER*****************

ERROR IN CODING:
onClick={actionClearItemFromCart(cartItem)} 
was causing the function to run on load not click

TO FIX:
onClick={ () => actionClearItemFromCart(cartItem)} 
Now this function is only run when the click happens, i think its got to do with react intercepting the click and using a callback running what we want,
in the previous case, the function just ran on creation of the div.
*****************************************************/


const CheckoutItem = ({cartItem, actionClearItemFromCart, actionAddItemToCart, actionRemoveItemFromCart}) => 
{
    const {name, imageUrl, price, quantity} = cartItem;
    return(
        <div className="checkout-item">
            <div className='image-container'>
                <img src={imageUrl} alt={name}></img>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={()=>{console.log("--");actionRemoveItemFromCart(cartItem)}}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={()=>actionAddItemToCart(cartItem)}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button"  onClick={()=>{console.log("++");actionClearItemFromCart(cartItem)}}>&#10005;</div>
        </div>
    );
}

/*dispatch is used only for actions like calling a function and updating state*/
const mapDispatchToProps = (dispatch) =>(
    {
        actionClearItemFromCart: (item) => dispatch(actionClearItemFromCart(item)),
        actionAddItemToCart: (item) => dispatch(actionAddItemToCart(item)),
        actionRemoveItemFromCart: (item) => dispatch(actionRemoveItemFromCart(item))
    }
);

const mapStateToProps = null;

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutItem);