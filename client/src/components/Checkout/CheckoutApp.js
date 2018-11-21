import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import { Redirect, Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import InjectedCheckoutForm from "./CheckoutForm";

import { firebaseDB } from "../../firebase";
import Authserver from "../authserver";
import jwt from "jsonwebtoken";

const checkoutPanel = {
  background: "#FFFFFF",
  marginBottom: "0",
  padding: "1rem",
  borderRadius: "25px",
  border: "4px solid #c2c2c2",
  maxWidth: "104rem",
  marginLeft: "25%",
  marginRight: "25%",
  marginBottom: "30px",
  marginTop:"80px",
  marginBottom:"80px"
};

class CheckoutApp extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
    if (localStorage.getItem("cart") != null) {
      var cartString = localStorage.getItem("cart");
      var cart = JSON.parse(cartString);
      this.state = {
        cartItems: this.getItemsFromCart(cart),
        totalPrice: 0,
        qty: 0,
        redirect: false,
        stripe: null
      };
    }
    this.getTotalPrice(this.state.cartItems);
    this.Auth = new Authserver();
  }

  getItemsFromCart = cart => {
    var cartItems = [];
    for (var itemID in cart) {
      cartItems.push(cart[itemID]);
    }
    return cartItems;
  };

  getTotalPrice(items) {
    var tPrice = 0;
    items.forEach(item => {
      tPrice += item.price * item.discount * item.quantityInCart;
    });
    return tPrice;
  }

  render() {

    return (
      <div style={checkoutPanel}>
        <div>
            <Elements>
              <CheckoutForm orders={this.state.cartItems}
              totalPrice={this.getTotalPrice(this.state.cartItems)}
                    onHistoryPush={() => this.props.history.push('/Confirm')}
              />
            </Elements>
        </div>
      </div>
    );
  }
}

export default CheckoutApp;
