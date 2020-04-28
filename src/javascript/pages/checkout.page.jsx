import React from 'react';
import '../../styles/checkout.page.styles.scss';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {selectCartItems, selectCartItemsTotal} from '../redux/cart.redux';

import CheckoutItem from '../components/checkout-item.component';

/*When there is one default export, you can not import with {}, you need to mention with {} and whatever name you will give, it will 
import the component from that file with this new name(if different)*/
import StripeCheckoutButton from '../components/stripe-button.component';

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
                <StripeCheckoutButton price={cartItemTotal}/>
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