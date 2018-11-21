import React, { Component } from 'react';
import axios from 'axios';

class ForgetPassword extends Component {
    constructor(){
        super()
        this.state = {
            username:'',
            answer:'',
            password:'',
            confirmpassword:'',
            error:''
            }
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
          [name]:value
        });
      };

      handleSubmit =(e) =>{
        e.preventDefault();
        if(this.state.username === ''){
            this.setState({error:"need to enter username"})
        }else if(this.state.password === ''){
            this.setState({error:"need to enter password"})
        }else if(this.state.confirmpassword === ''){
            this.setState({error:"need to confirm password"})
        }else if(this.state.password !== this.state.confirmpassword){
            this.setState({error:"confirm password doesn't match"})
        }else if(this.state.answer === ""){
            this.setState({error:"need to enter answer"})
        }else{
            var user = {
                username: this.state.username,
                password: this.state.password,
                answer:this.state.answer
            }
            axios.post('/api/forgetPassword',{user})
                .then(res=>{
                    if(res.data.code === 200){
                        this.setState({success:res.data.message, error:null});
                        setTimeout(6000);
                        window.location = '/'
                    }else if(res.data.code === 204){
                        this.setState({error:res.data.message})
                    }
                })
        }

      }

    render() {
        return (
            <div className="container" style={{textAlign:'center',marginTop:50}}>
            <div>
                <h5>username</h5>
                <input value={this.state.username} name='username' onChange={this.handleChange} type='text' />
            </div>
            <div><h4>How are you today</h4></div>
            <div>
                <h5>Answer</h5>
                <input value={this.state.answer} name='answer' onChange={this.handleChange} type='text' />
            </div>
            <div>
                <h5>New Password</h5>
                <input value={this.state.password} name='password' onChange={this.handleChange} type='password' />
            </div>
            <div>
                <h5>Confirm Password</h5>
                <input value={this.state.confirmpassword} name='confirmpassword' onChange={this.handleChange} type='password' />
            </div>
                <button className="btn btn-info" style={{marginTop:10}} onClick={this.handleSubmit}> submit </button>
                {this.state.error ?
                <div className="alert alert-danger" role="alert">
                    {this.state.error}
                </div>
                 : null }
                 {this.state.success ?
                <div className="alert alert-success" role="alert">
                    {this.state.success}
                </div>
                 : null }
            </div>
        );
    }
}

export default ForgetPassword;