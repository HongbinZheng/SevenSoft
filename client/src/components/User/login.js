import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {

    constructor(props) {
		super(props)
		this.state = {
            username:'',
            password:'',
            isAuth:false,
            code:null,
            message:"",
            token:''
        }
        this.submitLogin = this.submitLogin.bind(this)
        //this.Auth = new Authserver();
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
        let username = this.state.username;
        let password = this.state.password;
        axios.post('/api/login',{username,password}) 
                .then(res => {
                    if(res.data.code === 200){
                    localStorage.setItem('id_token',res.data.token);
                    let data = res.data;
                    this.setState({data})
                    console.log(this.state)
                    window.location='/'}else{
                    let data = res.data;
                    this.setState({data})
                    }
                })
    }

    updateForm = (newState) =>{
        this.setState({
            State:newState
        })
    }

    showValidation = (data) =>{
        let errorMessage = null; 
        console.log(data)
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
            }else{
           errorMessage =( <div className="label_error">
                {data.message}
            </div>)}
        }else{errorMessage = null;}
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
            {this.state.data ? this.showValidation(this.state.data) : null }
            </div>
    );
}   
};

export default Login;