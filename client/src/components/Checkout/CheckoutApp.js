import React, {Component} from 'react';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutForm';
import InjectedCheckoutForm from './CheckoutForm';


class CheckoutApp extends Component {
  constructor() {
     super();
     this.state = {stripe: null};
   }
   componentDidMount() {
     if (window.Stripe) {
       this.setState({stripe: window.Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx')});
}
     // } else {
     //   document.querySelector('#stripe-js').addEventListener('load', () => {
     //     // Create Stripe instance once Stripe.js loads
     //     this.setState({stripe: window.Stripe('pk_test_12345')});
     //  });
     // }
   }
   render() {
     // this.state.stripe will either be null or a Stripe instance
     // depending on whether Stripe.js has loaded.
     return (
       <StripeProvider stripe={this.state.stripe}>
         <Elements>
           <CheckoutForm />
         </Elements>
       </StripeProvider>
     );
   }
}

export default CheckoutApp;
