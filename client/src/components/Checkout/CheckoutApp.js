import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import { Redirect, Link } from 'react-router-dom'
import CheckoutForm from './CheckoutForm';
import InjectedCheckoutForm from './CheckoutForm';

import {firebaseDB} from '../../firebase';
import Authserver from'../authserver'
import jwt from'jsonwebtoken';

const checkoutPanel = {background:'#FFFFFF', marginBottom:'0', padding:'1rem',"borderRadius":"25px", border:'4px solid #c2c2c2', maxWidth:'104rem',marginLeft:"25%",marginRight:"25%",marginBottom:"30px"}



class CheckoutApp extends Component {
  constructor() {
     super();
     this.state = {
       redirect: false,

     }
     if(localStorage.getItem('cart') != null) {
         var cartString = localStorage.getItem('cart')
         var cart = JSON.parse(cartString)
         this.state ={cartItems: this.getItemsFromCart(cart), totalPrice: 0,qty:0,redirect:false,stripe: null,}
       }
       this.getTotalPrice(this.state.cartItems);
       this.Auth = new Authserver();
   }

   getItemsFromCart = (cart) => {
       var cartItems = []
       for(var itemID in cart) {
         cartItems.push(cart[itemID])
       }
       return cartItems
     }

     getTotalPrice(items) {
       var tPrice = 0
       items.forEach((item) => {
           tPrice += item.price * item.discount * item.quantityInCart
       })
       return tPrice
   }

   handleCheckOut(items){
     if(this.Auth.loggedIn()){
         var SERECT = "superserect"
         const token = localStorage.getItem('id_token')
         var decoded = jwt.verify(token, SERECT);
         //items.forEach(item=>{item.myRate = 0});
         console.log(items);
         firebaseDB.ref(`/orders/${decoded}`).push(items);
     }
     localStorage.removeItem('cart');
    this.setState({redirect:true})
   }

   render() {
     const {redirect} = this.state
     console.log(this.props)

     if (redirect){
     return (<Redirect to={{
         pathname: '/Confirm',
     }} />)
   }


     // this.state.stripe will either be null or a Stripe instance
     // depending on whether Stripe.js has loaded.
     return (
       <div style={checkoutPanel}>
       <div>
       <form onSubmit={()=>this.handleCheckOut(this.state.cartItems)}>

         <Elements>
           <CheckoutForm />
         </Elements>

         <div style={{ position: "relative", textAlign: "right", marginRight: "30px" }}>
           <button className="btn btn-primary" type="submit">Checkout</button>
         </div>

         </form>
         </div>
       </div>
     );
   }
}

export default CheckoutApp;
