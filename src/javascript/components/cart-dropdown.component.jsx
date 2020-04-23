import React from 'react';
import CustomButton from './custom-button.components';
import { withRouter } from 'react-router-dom';
/*This import is used to super charge the component to have access to history, location and match properties of the Route for any component
React only makes available these properties to the first child component which in this case is HomePage, after that, we would need to pass
or tunnel the properties through every component down the chain. In this example, HomePage->Directory->MenuItem. But we do not need these
properties in Directory so why pass it to Directory and hence we super charge MenuItem with withRouter() and allow it access directly 
without getting it passed down the chain to it.*/
import '../../styles/cart-dropdown.styles.scss';
import CartItem from './cart-item.component';

import { connect } from 'react-redux';

/*importing the cartItems selector instead of using property directly*/
import { toggleCartHidden, selectCartItems } from '../redux/cart.redux';
import { createStructuredSelector } from 'reselect';

const CartDropdown = (props) =>
{
    const {cartItems} = props;
    return(
        <div className='cart-dropdown'>
            <div className='cart-items'>
            {
                cartItems.length 
                ?
                cartItems.map((item) => (<CartItem key={item.id} item={item}/>))
                :
                <span className='empty-message'>Your cart is empty!</span>
            }
            </div>
            <CustomButton onClick={() => {console.log('Goto Checkout'); props.toggleCartHidden(); props.history.push('/checkout');}}> GO TO CHECKOUT </CustomButton>
        </div>
    );
}

/*You dont need to do this for 1 action item, dispatch is available in props with connect() and you can fire the function call by
just saying props.dispatch(toggleCartHidden())*/
const mapDispatchToProps = (dispatch) =>(
    {
        toggleCartHidden: () => dispatch(toggleCartHidden())
    }
);

/*const mapStateToProps = (reduxState) => ({cartItems: reduxState.cart.cartItems});*/
/*const mapStateToProps = (reduxState) => ({cartItems: selectCartItems(reduxState)}); //using selectors to return state properties
its a good idea to always use createStructuredSelector even for one item so we dont hav to change the code when we need more.*/
const mapStateToProps = createStructuredSelector({cartItems: selectCartItems});

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(CartDropdown)));
