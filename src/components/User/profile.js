import React, { Component } from 'react';
import Authserver from './../authserver'

class Profile extends Component {
    constructor(){
        super()
        this.Auth = new Authserver()
    }
    componentWillMount(){
        if(!this.Auth.loggedIn()){
            this.props.history.replace('/User')
        }
    }

    render() {
        return (
            <div>
                This is Profile page
            </div>
        );
    }
}

export default Profile;