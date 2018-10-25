import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    state = {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    }

    handleInputUsername = (event) => {
        this.setState({username:event.target.value})
    }
    handleInputEmail = (event) =>{
        this.setState({email:event.target.value})
    }
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }
    handleInputConfirmPassword = (event) => {
        this.setState({confirmPassword:event.target.value})
    }
    submitRegister = (e) => {
        e.preventDefault();
        const user = {
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword
        }
        axios.post('/api/register',{ user })
            .then(response =>{
                console.log(response.data)
                let data = response.data;
                this.setState(data);
                console.log(this.state);
            })
    }

    showValidation(data){
        let errorMessage = null;
        console.log(data);
        if(data.code !== null && data.code !== 200){
            if(data.code !== null && data.code !==200){
                if(this.state.username === ""){
                    data.code = null;
                    errorMessage = (<div>
                        Need to enter username;
                    </div>)
                }else if( this.state.password === ""){
                    data.code = null;
                    errorMessage = (<div>
                        Need to enter password;
                    </div>)
                }else if(this.state.confirmPassword === ""){
                    data.code = null;
                    errorMessage = (<div>
                        Need to confirm password;
                    </div>)
                }else if(this.state.email === ""){
                    data.code = null;
                    errorMessage = (<div>
                        Need to enter email;
                    </div>)
                } else{
               errorMessage =( <div className="label_error">
                    {data.message}
                </div>)}    
        }
    }
    return errorMessage;
}

    updateForm = (newState) =>{
        this.setState({
            State:newState
        })
    }
render(){
    return (
        <div className="register_container" >
        <form onSubmit={this.submitRegister}>
        <h2>Registation here</h2>
        <div className="form_element">
            <input 
                type="text"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={this.handleInputUsername}
            />
        </div>
        <div className="form_element">
            <input 
                type="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleInputEmail}
            />
        </div>
        <div className="form_element">
            <input 
                type="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleInputPassword}
            />
        </div>
        <div className="form_element">
            <input 
                type="password"
                placeholder="Confirm your password"
                value={this.state.confirmPassword}
                onChange={this.handleInputConfirmPassword}
            />
        </div>   
        <button type="submit">Create account</button>
        </form>
        {this.state.code ? this.showValidation(this.state) : null }
        </div>
    );
}
};

export default Register;