import React from 'react';
import '../../styles/checkout.page.styles.scss';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCartItems, selectCartItemsTotal} from '../redux/cart.redux';

import CheckoutItem from '../components/checkout-item.component';

class CheckoutPage extends React.Component 
{
    render() 
    {
        const {cartItemTotal, cartItems} = this.props;
    
        return (
            <div className='checkout-page'>
                <span>CHECKOUT PAGE</span>
                <div className='checkout-header'>
                    <div className='header-block'>
                        <span>Product</span>
                    </div>
                    <div className='header-block'>
                        <span>Description</span>
                    </div>
                    <div className='header-block'>
                        <span>Quantity</span>
                    </div>
                    <div className='header-block'>
                        <span>Price</span>
                    </div>
                    <div className='header-block'>
                        <span>Remove</span>
                    </div>
                </div>
                {
                    cartItems.map((cartItem) => (<CheckoutItem key={cartItem.id} cartItem={cartItem}/>))
                }
                <div className="total"><span> TOTAL: ${cartItemTotal}</span></div>
            </div>
        );
    }
}

const mapDispatchToProps = null;

const mapStateToProps = createStructuredSelector(
    {
        cartItems: selectCartItems,
        cartItemTotal: selectCartItemsTotal
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage);