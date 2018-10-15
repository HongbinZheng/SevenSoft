import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

    state = {
        username:'',
        email:'',
        password:'',
    }
    ////////////////Login ////////////////////
    handleInputUsername = (event) => {
        this.setState({username:event.target.value})
    }
    handleInputPassword = (event) => {
        this.setState({password:event.target.value})
    }
    submitLogin = (e) =>{
        e.preventDefault();
         const user ={
             username: this.state.username,
             password: this.state.password
         }
        axios.post('/api/login', { user })
             .then(function(response){
                 console.log(response)
                 console.log(response.data)
             })
             .catch(error => {
                console.log(error.response)
            });
    }
    updateForm = (newState) =>{
        this.setState({
            State:newState
        })
    }
render(){
    return (
        <div className="login_container">
        <form onSubmit={this.submitLogin}>
            <h2>Log in here</h2>
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
                    type="password"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.handleInputPassword}
                />
            </div>
            <button type="submit">Log in</button>
            </form>
            </div>
    );
}   
};

export default Login;