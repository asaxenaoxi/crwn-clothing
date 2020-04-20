import React from 'react';
import CustomButton from './custom-button.components';

import '../../styles/cart-dropdown.styles.scss';
import CartItem from './cart-item.component';

import { connect } from 'react-redux';

//importing the cartItems selector instead of using property directly
import { selectCartItems } from '../redux/cart.redux';

const CartDropdown = ({cartItems}) =>
(
    <div className='cart-dropdown'>
        <div className='cart-items'>
        {
            cartItems.map((item) => (<CartItem key={item.id} item={item}/>))
        }
        </div>
        <CustomButton> GO TO CHECKOUT </CustomButton>
    </div>
)

//const mapStateToProps = (reduxState) => ({cartItems: reduxState.cart.cartItems});
const mapStateToProps = (reduxState) => ({cartItems: selectCartItems(reduxState)}); //using selectors to return state properties

export default connect(mapStateToProps, null)(CartDropdown);
