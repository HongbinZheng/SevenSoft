import React, {Component} from 'react';
import {
    CardCVCElement, CardElement, CardExpiryElement, CardNumberElement, injectStripe,
    PostalCodeElement
} from 'react-stripe-elements';
import CardSection from './CardSection'

const label = {display: 'block', fontSize:'2rem', color:'#808080', borderRadius:'.6rem'}
const cardElement = {
    base: {
        fontSize:'14px',
        color: '#424770',
        letterSpacing: '0.025em',
        '::placeholder': {
            color: '#aab7c4',
        }}, invalid: {
        color: '#9e2146',
        border:'1px solid grey'
    }};
const cardElementDiv = {border:'1px solid', padding:'1rem', borderRadius:'.6rem',
    maxHeight:'6rem'};

const handleBlur = () => {
    console.log('[blur]');
};
const handleChange = change => {
    console.log('[change]', change);
};
const handleClick = () => {
    console.log('[click]');
};
const handleFocus = () => {
    console.log('[focus]');
};
const handleReady = () => {
    console.log('[ready]');
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);

    this.state = {complete: false};
    //this.submit = this.submit.bind(this);
    this.handleSubmit = (ev) => {
        // We don't want to let default form submission happen here, which would refresh the page.
        ev.preventDefault();

        if (this.props.stripe) {
            this.props.stripe.createSource({
                type: 'card',
                currency: 'usd',
                owner:{name:this.props.name} })
                .then(payload => {this.props.onSubmit(payload);} );
        } else {
            console.log("Stripe.js hasn't loaded yet.");
        }
    };

  }

  state = {
      f_Name:'',
      l_Name:'',
      email:'',
      phone:'',
      address:'',
      city:'',
      postCode:'',
  }

  handleInputFirstName = (event) => {
      this.setState({f_Name:event.target.value})
  }
  handleInputLastName = (event) => {
      this.setState({l_Name:event.target.value})
  }
  handleInputEmail = (event) => {
      this.setState({email:event.target.value})
  }
  handleInputPhone = (event) => {
      this.setState({phone:event.target.value})
  }
  handleInputAddress = (event) => {
      this.setState({address:event.target.value})
  }
  handleInputCity = (event) => {
      this.setState({city:event.target.value})
  }
  handleInputPostCode = (event) => {
      this.setState({state:event.target.value})
  }


  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <div className="login_container">

        <form>

          <div className="form-row">
            <div className="form-group col-md-6">
            <label for="validationServer01">First name</label>
            <input type="text" class="form-control" id="validationServer01" placeholder="First name" required/>
            </div>

            <div className="form-group col-md-6">
              <label for="inputLastName">Last Name</label>
              <input type="text" className="form-control" id="inputLastName" placeholder="Last Name"></input>
            </div>
          </div>

          <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
          </div>
          <div className="form-group col-md-6">
            <label for="inputAddress2">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
          </div>
          </div>


          <div className="form-row">
            <div className="form-group col-md-6">
              <label for="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity"></input>
            </div>
            <div className="form-group col-md-4">
              <label for="inputState">State</label>
              <select id="inputState" className="form-control">
                <option selected>Choose a State </option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </select>
            </div>
            <div className="form-group col-md-2">
              <label for="inputZip">Zip</label>
              <input type="text" className="form-control" id="inputZip"></input>

            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck"></input>
              <label className="form-check-label" for="gridCheck">
                Billing address same as shipping
              </label>
            </div>
          </div>

        </form>
        </div>
        <div >
        <CardElement/>
        </div>


        <button onClick= {this.submit} class="btn btn-primary" type="submit">Checkout</button> //direct to congratz page

      </div>

    );
  }
}

export default injectStripe(CheckoutForm);
