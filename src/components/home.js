import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
    render() {
        return (
            <div>
                <h1>This is Home Page</h1>
                <h2>
                <Link to="/User">User</Link><br/>
                
                </h2>
            </div>
        );
    }
}

export default Home;