import React, { Component } from 'react';
import Login from './login';
import Register from'./register'

class User extends Component {

 
    render() {
        return (
            <div>
                <Login />
                <Register />
            </div>
        )
    };
};
export default User;