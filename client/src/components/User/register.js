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
        <div className="register_container" style={{marginTop:'25px', marginBottom:'25px', marginLeft:'75px'}}>
        <form onSubmit={this.submitRegister}>
        <h4 style={{marginTop:'5px'}}>Username</h4>
        <div className="form_element">
            <input
                style={{width:'200px', height:"30px", borderRadius:'10px'}}
                type="text"
                placeholder="Enter a username"
                value={this.state.username}
                onChange={this.handleInputUsername}
            />
        </div>
        <h4 style={{marginTop:'15px'}}>Email</h4>
        <div className="form_element">
            <input
                style={{width:'200px', height:"30px", borderRadius:'10px'}}
                type="email"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={this.handleInputEmail}
            />
        </div>
        <h4 style={{marginTop:'15px'}}>Password</h4>
        <div className="form_element">
            <input
                style={{width:'200px', height:"30px", borderRadius:'10px'}}
                type="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleInputPassword}
            />
        </div>
        <div className="form_element">
            <input
                style={{marginTop:'5px', width:'200px', height:"30px", borderRadius:'10px'}}
                type="password"
                placeholder="Confirm your password"
                value={this.state.confirmPassword}
                onChange={this.handleInputConfirmPassword}
            />
        </div>   
        <button className="btn btn-primary"type="submit" style={{marginLeft:'117px', marginTop:'20px'}}>Register</button>
        </form>
        {this.state.code ? this.showValidation(this.state) : null }
        </div>
    );
}
};

export default Register;