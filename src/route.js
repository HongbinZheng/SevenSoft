import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/home';
import User from './components/User/User';
import Layout from './hoc/layout/layout';
import Beverages from './components/items/beverages/beverages';
import Dairy from './components/items/dairy/dairy';
import Meats from './components/items/meats/meats';
import Produce from './components/items/produce/Produce';

class Router extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/User" exact component={User}/>
                    <Route path="/Beverages" exact component={Beverages}/>
                    <Route path="/dairy" exact component={Dairy}/>
                    <Route path="/meats" exact component={Meats}/>
                    <Route path="/Produce" exact component={Produce}/>
                </Switch>
            </Layout>
        );
    }
}

export default Router;