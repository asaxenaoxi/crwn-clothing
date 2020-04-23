import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/header.styles.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {auth} from '../utils/firebase.util';
import { connect } from 'react-redux';

/*If you have only one default export and you try and use the {} deconstructor to get the CartIcon, it will throw an error as deconstructor basically
will try and CartIcon inside of CartIcon which doesnt exist.*/
import CartIcon from './cart-icon.component';
import CartDropdown from './cart-dropdown.component';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../redux/user.redux';
import { selectHidden } from '../redux/cart.redux';

/*currentUser on props is coming from redux after supercharging this component with connect() and not when the component is being laid out in <App>*/
const Header = ({currentUser, hideCart}) => (
    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">SHOP</Link> 
            <Link className="option" to="/contact">CONTACT</Link> 
            
            {
                /*Header changes to sign-out when there is current user*/
                currentUser 
                ?
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                    <Link className="option" to="/signin">SIGN IN</Link> 
            }
            <CartIcon></CartIcon>
        </div>
        {
            hideCart
            ?
            null
            :
            <CartDropdown></CartDropdown>
        }
    </div>
)

/*This function can be anything but best practice is to use this name as everyone does
this function takes in the rootReducer which is really our application state now and 
from that returns the state's component specific reducer's object value*/

/* 1st way
const mapStateToProps = (reduxState) => (
                                            { 
                                                currentUser: reduxState.user.currentUser,
                                                hideCart: reduxState.cart.hidden
                                            }
                                        );*/

/* 2nd way */
/*Here when you want to destructure nested values, we use the {var:{attirbute}} collon method to get the 2nd level destructuring
{ user: {currentUser} = reduxState.user.currentUser*/
/*const mapStateToProps = ( { user: {currentUser}, cart: {hidden} }) => (
                                            { 
                                                currentUser,
                                                hideCart: hidden
                                            }
                                        );*/

/* 3rd Way - Using selectors*/
/*const mapStateToProps = (reduxState) => (
                                            { 
                                                currentUser: selectCurrentUser(reduxState),
                                                hideCart: selectHidden(reduxState)
                                            }
                                        ); */

/* 4th way which is same as 3rd just using a shortcut instead of making a function call with the help of createStructuredSelector */
const mapStateToProps = createStructuredSelector(
    { 
        currentUser: selectCurrentUser,
        hideCart: selectHidden
    }
);

/*The above function basically reads that, if you pass me the redux state = rootReducer, i will extract the specific object called
user.currentUser from it, set it to a property value named currentUser and pass an object with that property which can then
be passed to the Header component to return a newer <Supercharged Header currentUser=state.user.currentUser/>. 

This is a similar function to the one above. mapStateToProps makes available the getter value into the properties for accessing the
readable object where as mapDispatchToProps function makes available the setter function to the component to make changes to the 
object in redux state/store. */

const mapDispatchToProps = null;

/*connect() is a higher order component (HoC) from redux library which basically allows the returned component access to Redux 
related items in the project. This is just like withRouter() from React-router in term of HoC. Now connect() returns another 
HoC which is then passed our Header Component. So connect takes a function which intern takes the rootReducer and extracts the
right attributes needed for supercharging this component and then takes in the header attaches these properties out of the 
redux store / state and makes them available to the component being superchaged (Header)*/

export default connect(mapStateToProps, mapDispatchToProps)(Header);