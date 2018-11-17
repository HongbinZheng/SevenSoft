import React, { Component } from 'react';
import axios from 'axios'
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
  });

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
	}

    
    ////////////////Login ////////////////////
    handleChange = ({ target: { name, value } }) => {
        this.setState({
          [name]:value
        });
      };


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
    const { classes } = this.props;
    return (
        <div className="login_container">
        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.submitLogin} style={{textAlign:"center"}}>
            <div className="form_element">
                <TextField
                        id="outlined-username-input"
                        label="Username"
                        name="username"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
            </div>
            <div className="form_element">
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        name="password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
            </div>
            <button className="btn btn-primary" type="submit" style={{marginLeft:'117px', marginTop:'20px'}}>Login</button>
            </form>
            {this.state.data ?
                <div className="alert alert-danger" role="alert">
                    {this.showValidation(this.state.data)}
                </div>
                 : null }
            </div>
    );
}   
};

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default  withStyles(styles)(Login);