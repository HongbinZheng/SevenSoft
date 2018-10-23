import React, { Component } from 'react';
import Authserver from './../authserver'

class Profile extends Component {
    constructor(){
        super()
        this.Auth = new Authserver()
        this.handleLogout.bind(this)
    }
    componentWillMount(){
        if(!this.Auth.loggedIn()){
            this.props.history.replace('/User')
        }
    }

    handleLogout(e){
        e.preventDefault();
        this.Auth.logout();
        this.props.history.replace('/')
    }

    render() {
        return (
            <div>
                This is Profile page
                <p className="App-intro">
            <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
                 </p>
            </div>
        );
    }
}

export default Profile;