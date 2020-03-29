import React from 'react'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth,createUserProfileDocument} from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {

    constructor(){
        super();

        this.state = {
            username:"",
            email:"",
            password:"",
            confirmPassword:""
        }
    }

    handleChange = event => {
        const {name,value} = event.target;
        this.setState({[name]: value});
    };

    handleSubmit = async event => {
        event.preventDefault();
        const {username,email,password,confirmPassword} = this.state;
        console.info(this.state);

        if(password !== confirmPassword){
            alert("Password not match, try again");
            return;
        }

        try{
            const AuthUser = await auth.createUserWithEmailAndPassword(email,password);
            console.warn(AuthUser);
            AuthUser.displayName=username;
            await createUserProfileDocument(AuthUser, {username} );

            this.setState({
                username:'',
                email:'',
                password:'',
                confirmPassword:''
            });
        }catch(error){
            console.error("There is an error",error.message);
        }
    };

    render(){
        const {username,email,password,confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2>I don't have an account</h2>
                <span>Sign Up With your Email and Password</span>

                <form className='sign-up-form' onSubmit={this.handleSubmit}>

                    <FormInput 
                        type="text"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        label="Username"
                        required
                    />
                    <FormInput 
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        label="Email"
                        required    
                    />
                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />

                    <CustomButton type="submit">Sign Up</CustomButton>
                    
                </form>

            </div>
        )
    }

}

export default SignUp;