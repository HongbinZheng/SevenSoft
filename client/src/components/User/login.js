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
        <div className="login_container" style={{marginTop:'15px', marginBottom:'15px'}}>
        <form onSubmit={this.submitLogin}>
            <div className="form_element">
                <h3 style={{marginLeft:'70px',}}>Username</h3>
                <input
                    style={{marginLeft:'70px', width:'200px', height:"30px", borderRadius:'10px'}}
                    type="text"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={this.handleInputUsername}
                />
            </div>
            <div className="form_element">
                <h3 style={{marginLeft:'70px', marginTop:'15px'}}>Password</h3>
                <input
                    style={{marginLeft:'70px', width:'200px', height:"30px", borderRadius:'10px'}}
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleInputPassword}
                />
            </div>
            <button className="btn btn-primary" type="submit" style={{marginLeft:'207px', marginTop:'20px'}}>Login</button>
            </form>
            {this.state.data ? this.showValidation(this.state.data) : null }
            </div>
    );
}   
};

export default Login;