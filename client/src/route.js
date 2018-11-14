import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import User from "./components/User/User";
import Layout from "./hoc/layout/layout";
import Aisle from "./components/items/aisle";
import Item from "./components/items/item";
import CheckoutReview from "./components/Checkout/checkoutReview";
import OrdersPage from "./components/User/ordersPage";
import SearchResult from "./components/items/searchResult";
import WatchList from "./components/User/watchList";
//////////testing//////////
import Profile from "./components/User/profile";
/////////////////////////////////////////

class Router extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/User" exact component={User} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/review" exact component={CheckoutReview} />
          <Route path="/orders" exact component={OrdersPage} />
          <Route path="/searchResult" exact component={SearchResult} />
          <Route path="/:aisle" exact component={Aisle} />
          <Route path="/:aisle/:item" exact component={Item} />
        </Switch>
      </Layout>
    );
  }
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/User" exact component={User} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/review" exact component={CheckoutReview} />
          <Route path="/orders" exact component={OrdersPage} />
          <Route path="/watchList" exact component={WatchList} />
          <Route path="/:aisle" exact component={Aisle} />
          <Route path="/:aisle/:item" exact component={Item} />
        </Switch>
      </Layout>
    );
  }
}

export default Router;
