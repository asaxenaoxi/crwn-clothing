import React from 'react';
import '../../styles/sign-in.styles.scss';
import FormInput from './form-input.component';
import CustomButton from './custom-button.components';

/*we are importing the google setup we did for firebase in firebase.util.js*/
import { auth, signInWithGoogle } from '../utils/firebase.util';

class SignIn extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            email: "",
            password: ""
        }
    }

    handleOnChange = (event) => 
    {
        const {value, name} = event.target;
        /*event.target will be the input element where change is occuring either email or password and from that we will get the name of 
        the element and its value that has been updated.*/
        this.setState({[name]: value});
        /*This [<varname>] is the feature of react where it will dynamically pick up the name and use that to set the variable with that
        name in the state objct with the value of value.*/
    }

    handleOnSubmit = async (event) => 
    {
        event.preventDefault();

        try
        {
            const { email, password } = this.state; 
            console.log("Signing in with email/password: '", email, "' + '", password + "'");
            auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        }
        catch(error)
        {
            console.log("handleOnSubmit() error signing with email and password:");
            console.error(error);
        }
    }

    /*
    Applied to : <FormInput label="password" type="password" name="password" value={this.state.password}
    We are setting the value to the state, because everytime there is a change, we will call handleOnChange function
    and we update the state and when we update the state the entire component gets re-rendered which would mean that 
    whatever was typed will disappear and for it to be populated with last set value, it needs to be updated from the last
    updated state, same goes for password */

    render()
    {
        return(
            <div className="sign-in">
                <h2 className="title">I alread have an Account.</h2>
                <span>Sign in with your email and password.</span>

                <form onSubmit={this.handleOnSubmit}>
                    <FormInput label="email" type="email" name="email" value={this.state.email} handleChange={this.handleOnChange} required/>
                    <FormInput label="password" type="password" name="password" value={this.state.password}  handleChange={this.handleOnChange} required/>

                    <div className="buttons">
                        <CustomButton type="submit">SIGN IN</CustomButton>
                        <CustomButton buttonStyle='google-sign-in' onClick={ signInWithGoogle }>SIGN IN WITH GOOGLE</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn;