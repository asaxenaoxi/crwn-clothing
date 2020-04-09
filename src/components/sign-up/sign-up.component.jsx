import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.components';
import { auth, createUserProfileDocument } from '../../firebase/firebase.util';

class SignUp extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    handleOnChange = (event) => 
    {
        const {value, name} = event.target;
        //event.target will be the input element where change is occuring either email or password and from that we will get the name of 
        //the element and its value that has been updated.
        this.setState({[name]: value});
        //This [<varname>] is the feature of react where it will dynamically pick up the name and use that to set the variable with that
        //name in the state objct with the value of value.
    }

    handleOnSubmit = async (event) => 
    {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;

        //step 1. check if pass & confirm password match. if they dont then return exit
        if(password !== confirmPassword)
        {
            alert("Password does not match Confirm Password");
            return;
        }
        
        //step 2. If all validations are good, we ask the firebase auth library to create us a user and give us back a userAuth object.
        try
        {
            //Out of the json obj sent back by the below function, userAuth obj is in the user keyword, hence we are destructuring it out
            //firebase will use this email and password combo and create us a new user and give us a token to manage
            const { user } = await auth.createUserWithEmailAndPassword(email, password);

            //displayName is being sent as additional parameters to be stored in the firestore
            await createUserProfileDocument(user, {displayName});

            //once the data has been stored, we will clear the state & the form and take the user to the homepage
            this.setState(
            {
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
        }
        catch(error)
        {
            console.error("Something went wrong while trying to create a user in firebase::auth or while trying to store profile in firestore:");
            console.error(error);
        }
        //step 3. Once the userAuth obj is returned back from firebase::auth then we save it in firestore like we did in sign-in

    }

    render()
    {
        const {displayName, email, password, confirmPassword} = this.state;
        
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an Account.</h2>
                <span>Sign up with your email and password.</span>

                <form onSubmit={this.handleOnSubmit}>
                    <FormInput label="Display Name" type="text" name="displayName" value={displayName} handleChange={this.handleOnChange} required/>
                    <FormInput label="E-Mail" type="email" name="email" value={email} handleChange={this.handleOnChange} required/>
                    {/*We are setting the value to the state, because everytime there is a change, we will call handleOnChange function
                    and we update the state and when we update the state the entire component gets re-rendered which would mean that 
                    whatever was typed will disappear and for it to be populated with last set value, it needs to be updated from the last
                    updated state, same goes for password */}
                    <FormInput label="Password" type="password" name="password" value={password}  handleChange={this.handleOnChange} required/>
                    <FormInput label="Confirm Password" type="password" name="confirmPassword" value={confirmPassword}  handleChange={this.handleOnChange} required/>
                
                    <div className="buttons">
                        <CustomButton type="submit">SIGN UP</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignUp