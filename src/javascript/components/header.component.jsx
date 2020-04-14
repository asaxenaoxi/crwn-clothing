import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/header.styles.scss';
import {ReactComponent as Logo} from '../../assets/logo.svg';
import {auth} from '../utils/firebase.util';

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
                currentUser 
                ?
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                :
                    <Link className="option" to="/signin">SIGN IN</Link> 
            }
        </div>
    </div>
)

export default Header;