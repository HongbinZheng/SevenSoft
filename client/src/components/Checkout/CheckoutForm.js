import React, { Component } from "react";
import {
  CardCVCElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  injectStripe,
  PostalCodeElement
} from "react-stripe-elements";
import CardSection from "./CardSection";
import AddressSection from "./AddressSectin";

const label = {
  display: "block",
  fontSize: "2rem",
  color: "#808080",
  borderRadius: ".6rem"
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      complete: false,
      checked: true
    };
    //this.submit = this.submit.bind(this);
    this.handleSubmit = ev => {
      // We don't want to let default form submission happen here, which would refresh the page.
      ev.preventDefault();

      if (this.props.stripe) {
        this.props.stripe
          .createSource({
            type: "card",
            currency: "usd",
            owner: { name: this.props.name }
          })
          .then(payload => {
            this.props.onSubmit(payload);
          });
      } else {
        console.log("Stripe.js hasn't loaded yet.");
      }
    };
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div>
        <div>
          <div>
            <CardSection />
          </div>
          <h3>Shipping Address</h3>
          <AddressSection />
        </div>
      </div>
    );
  }
}

export default CheckoutForm;
