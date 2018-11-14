import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import InjectedCheckoutForm from './CheckoutForm';

const checkoutPanel = {background:'#FFFFFF', marginBottom:'0', padding:'1rem',"borderRadius":"25px", border:'4px solid #c2c2c2', maxWidth:'104rem',marginLeft:"25%",marginRight:"25%",marginBottom:"30px"}


class CheckoutApp extends Component {
  constructor() {
     super();
     this.state = {stripe: null};
   }

   render() {
     console.log( this.props.location.state)
     // this.state.stripe will either be null or a Stripe instance
     // depending on whether Stripe.js has loaded.
     return (
       <div style={checkoutPanel}>
       <div>
         <Elements>
           <CheckoutForm />
         </Elements>

         <div style={{ position: "relative", textAlign: "right", marginRight: "30px" }}>
           <button onClick={this.handleSubmit} className="btn btn-primary" type="submit">Checkout</button>
         </div>
         </div>
       </div>
     );
   }
}

export default CheckoutApp;
