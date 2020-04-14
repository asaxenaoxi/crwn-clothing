import React from 'react';
import '../../styles/sign-in-and-sign-up.page.styles.scss';
import SignIn from '../components/sign-in.component';
import SignUp from '../components/sign-up.component';

const SignInAndSignUp = () => (
    <div className="sign-in-and-sign-up">
    <SignIn></SignIn>
    <SignUp></SignUp>
    </div>
)

export default SignInAndSignUp;