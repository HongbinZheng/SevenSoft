import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Authserver from '../../authserver';

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
  

class Changepassword extends Component {
    constructor(){
        super()
        this.state={
            password:'',
            new_password:'',
            confirm_password:'',
            error:'',
        }
        this.Auth = new Authserver()
        this.handleChange = this.handleChange.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState({
          [name]:value
        });
      };

    submitLogin = (e) =>{
        e.preventDefault();
        let username = this.props.username;
        let password = this.state.password;
        let newpw = this.state.new_password;
        let confirm = this.state.confirm_password;
        console.log(username)
        if(password === ""){
            this.setState({
                error:"old password cannot be empty"
            })
        }else if(newpw === "" || confirm ===""){
            this.setState({
                error:"need to input new password or confirm new password"
            })
        }
        else if(newpw !== confirm){
            this.setState({
                error:"confirm password not match"
            })
        }else{
            axios.post(`/api/login`,{username,password})
                .then(res=>{
                    if(res.data.code === 200){
                        axios.post(`/api/resetPassword`,{username,newpw})
                            .then(res=>{
                                console.log(res.data)
                                this.setState({success:res.data.message})
                                setTimeout(5000);
                                this.Auth.logout();
                                window.location = '/'
                            })
                    }else{
                        this.setState({error:"wrong password"})
                    }
                })
        }
    }
    render() {
        const { classes } = this.props;
        console.log(this.props)
        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off" onSubmit={this.submitLogin}>
                    <div className="login_container" style={{ marginTop: '15px', marginBottom: '15px',textAlign:"center" }}>
                            <div className="form_element">
                                <TextField
                                    id="outlined-password-input1"
                                    label="Old Password"
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
                                    label="New Password"
                                    className={classes.textField}
                                    type="password"
                                    name="new_password"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    id="outlined-password-input3"
                                    label="Confirm New Password"
                                    className={classes.textField}
                                    type="password"
                                    name="confirm_password"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <button className="btn btn-primary" type="submit" style={{ marginLeft: '207px', marginTop: '20px' }}>Submit</button>
                    </div>
                </form>
                {this.state.error ?
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>
                    :
                    null}
                {this.state.success ?
                <div class="alert alert-success" role="alert">
                    {this.state.success}
                </div>
                    : null}
            </div>
        );
    }
}

Changepassword.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  

export default withStyles(styles)(Changepassword);