import React, {Component} from 'react';
import axios from 'axios';
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

class Register extends Component {
    state = {
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        answer:'',
        error:'',
    }


    handleChange = ({ target: { name, value } }) => {
        this.setState({
          [name]:value
        });
      };


    submitRegister = (e) => {
        e.preventDefault();
        const valid = (/\S+@\S+\.\S+/).test(this.state.email)
        if(this.state.username === ""){
            this.setState({error:'Need to enter username;'})
        }else if(this.state.password === ""){
            this.setState({error:'Need to enter password;'})
        }else if(this.state.confirmPassword === ""){
            this.setState({error:'Need to confirm password;'})
        }else if(this.state.email === ""){
            this.setState({error:'need to enter email;'})
        }
        else if(this.state.email !== "" && !valid){
            this.setState({error:'Wrong formation of email;'})
        }else{
        const user = {
            username:this.state.username,
            email:this.state.email,
            password:this.state.password,
            confirmPassword:this.state.confirmPassword,
            answer:this.state.answer
        }
        axios.post('/api/register',{ user })
            .then(response =>{
                if(response.data.code === 200){
                console.log(response.data)
                let data = response.data;
                localStorage.setItem('id_token',response.data.token);
                this.setState(data);
                this.setState({error:""})
                console.log(this.state);
                window.location='/'
            }else{
                console.log(response.data)
                this.setState({error:response.data.message})
            }
            })
        }
    }

    updateForm = (newState) =>{
        this.setState({
            State:newState
        })
    }

render(){
    const { classes } = this.props;
    return (
        <div className="register_container" style={{fontFamily:'Lucida Handwriting'}}>
        <form onSubmit={this.submitRegister} className={classes.container} noValidate autoComplete="off">
        <div className="form_element">
                    <TextField
                        id="outlined-username-input1"
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
                        id="outlined-email-input"
                        label="Email"
                        className={classes.textField}
                        type="email"
                        name="email"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
        </div>
        <div className="form_element">
                    <TextField
                        id="outlined-password-input1"
                        label="Password"
                        name="password"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
        </div>
        <div className="form_element">
                    <TextField
                        id="outlined-password-input2"
                        label="Password"
                        name="confirmPassword"
                        className={classes.textField}
                        type="password"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
        </div>   
        <h6 style={{fontFamily:"roboto"}}>Question for reset password: 
            How are you today</h6>
        <div className="form_element">
                    <TextField
                        id="outlined-answer-input1"
                        label="Answer"
                        name="answer"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange}
                    />
        </div>
        <button className="btn btn-primary"type="submit" style={{marginLeft:'117px', marginTop:'20px'}}>Register</button>
        </form>
        {this.state.error ? 
            <div className="alert alert-danger" role="alert">
                {this.state.error}
            </div> : null }
        </div>
    );
}
};

Register.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default  withStyles(styles)(Register);