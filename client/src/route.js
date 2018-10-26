import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/home';
import User from './components/User/User';
import Layout from './hoc/layout/layout';
import Aisle from './components/items/aisle'
import Item from './components/items/item'
//////////testing//////////
import Profile from './components/User/profile';
import Authserver from './components/authserver';
/////////////////////////////////////////

class Router extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/User" exact component={User}/>
                    <Route path='/profile' exact component={Profile}/>
                    <Route path='/abc' exact component={Authserver}/>
                    <Route path='/:aisle' exact component={Aisle} />
                    <Route path='/:aisle/:item' exact component={Item} />
                </Switch>
            </Layout>
        );
    }
}

export default Router;