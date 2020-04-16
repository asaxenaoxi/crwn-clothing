import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/header.styles.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {auth} from '../utils/firebase.util';
import { connect } from 'react-redux';

//currentUser on props is coming from redux after supercharging this component with connect() and not when the component is being laid out in <App>
const Header = ({currentUser}) => (
/*
holding div
(inside 2 next level containers)
    logo container Link component
    options links area div
    (inside will be individual link components)
*/    

    <div className="header">
        <Link className="logo-container" to="/">
            <Logo className="logo" />
        </Link>
        <div className="options">
            <Link className="option" to="/shop">SHOP</Link> 
            <Link className="option" to="/contact">CONTACT</Link> 
            
            {
                //Header changes to sign-out when there is current user
                currentUser 
                ?
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                    <Link className="option" to="/signin">SIGN IN</Link> 
            }
        </div>
    </div>
)

//This function can be anything but best practice is to use this name as everyone does
//this function takes in the rootReducer which is really our application state now and 
//from that returns the state's component specific reducer's object value
const mapStateToProps = (reduxState) => ({ currentUser: reduxState.user.currentUser})
//The above function basically reads that, if you pass me the redux state = rootReducer, i will extract the specific object called
//user.currentUser from it, set it to a property value named currentUser and pass an object with that property which can then
//be passed to the Header component to return a newer <Supercharged Header currentUser=state.user.currentUser/>. 

//This is a similar function to the one above. mapStateToProps makes available the getter value into the properties for accessing the
//readable object where as mapDispatchToProps function makes available the setter function to the component to make changes to the 
//object in redux state/store. 
const mapDispatchToProps = null;

//connect() is a higher order component (HoC) from redux library which basically allows the returned component access to Redux 
//related items in the project. This is just like withRouter() from React-router in term of HoC. Now connect() returns another 
//HoC which is then passed our Header Component. So connect takes a function which intern takes the rootReducer and extracts the
//right attributes needed for supercharging this component and then takes in the header attaches these properties out of the 
//redux store / state and makes them available to the component being superchaged (Header)
export default connect(mapStateToProps, mapDispatchToProps)(Header);