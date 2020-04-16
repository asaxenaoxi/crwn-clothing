import React from 'react';
import {connect} from 'react-redux';
import {toggleCartHidden} from '../redux/cart.redux';

import {ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import '../../styles/cart-icon.styles.scss';

const CartIcon = (props) => 
(
        <div className='cart-icon' onClick={props.toggleCartHidden}>
            <ShoppingIcon className='shopping-icon'></ShoppingIcon>
            <span className='item-count'>0</span>
        </div>
)

const mapDispatchToProps = (dispatch) =>(
    {
        toggleCartHidden: () => dispatch(toggleCartHidden())
    }
);

const mapStateToProps = null;

//this will add toggleCartHidden as a property to CartIcon
export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);