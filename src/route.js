import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/home';
import User from './User/User';

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/User" exact component={User}></Route>
            </Switch>
        );
    }
}

export default Router;