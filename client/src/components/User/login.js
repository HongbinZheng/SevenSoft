import React, { Component } from 'react';
import Authserver from '../authserver'


class Login extends Component {

    constructor(props) {
		super(props)
		this.state = {
            username:'',
            password:'',
            isAuth:false,
            code:null
        }
        this.submitLogin = this.submitLogin.bind(this)
        this.Auth = new Authserver();
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
         this.Auth.login(this.state.username,this.state.password)
            
    }

    updateForm = (newState) =>{
        this.setState({
            State:newState
        })
    }

    showValidation = (data) =>{
        let errorMessage = null; 
        if(data.code !== null && data.code !==200){
            if(data.username === ""){
                data.code = null;
                errorMessage = (<div>
                    Need to enter username;
                </div>)
            }else if( data.password === ""){
                data.code = null;
                errorMessage = (<div>
                    Need to enter password;
                </div>)
            }else{
           errorMessage =( <div className="label_error">
                {data.message}
            </div>)}
        }
        return errorMessage
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
            { this.showValidation(this.state) }
            {this.state.code === 200 ? <Authserver user={this.state}/> : null}
            </div>
    );
}   
};

export default Login;