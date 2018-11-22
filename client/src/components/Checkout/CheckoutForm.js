import React, { Component } from "react";
import axios from "axios";
import { Redirect, withRouter  } from "react-router-dom";

import CardSection from "./CardSection";
import Authserver from "../authserver";
import { firebaseDB } from "../../firebase";
import jwt from "jsonwebtoken";


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      email:'',
      Zip: "",
      bfirstname: "",
      blastname: "",
      baddress1: "",
      baddress2: "",
      bcity: "",
      bstate: "",
      bZip: "",
      username: "",
      checked: true,
      redirect:false
    };
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCheckOut = this.handleCheckOut.bind(this)
    this.Auth = new Authserver();
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      var username = this.Auth.getUserName();
      this.setState({ username: username });
      axios.get(`/api/getAddress?username=${username}`).then(res => {
        console.log(res.data);
        if (res.data) {
          this.setState(res.data);
        }
      });
    }
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleOnChange() {
    this.setState({ checked: !this.state.checked });
  }

  handleCheckOut(e){
    if (this.Auth.loggedIn()) {
      var SERECT = "superserect";
      const token = localStorage.getItem("id_token");
      var decoded = jwt.verify(token, SERECT);
      const items = this.props.orders;
      items.forEach(item=>{item.myRate = 0});
      console.log(items);
      firebaseDB.ref(`/orders/${decoded}`).push(items);
    }
    var email = this.state.email;
    var orders = this.props.orders;
    var totalprice = this.props.totalPrice
    axios.post('/api/sentEmail',{email,orders,totalprice})
        .then(res=>{
          console.log(res.data)
        })
    localStorage.removeItem("cart");
    this.setState({redirect:true})
  }

  render() {
    const { redirect } = this.state;
    console.log(this.props);
    if (redirect) {
      return (
        <Redirect to="/Confirm" />
      );
    }
    return (
      <div>
        <div>
          <div>
            <CardSection />
          </div>
          <h3>Shipping Address</h3>
          <form data-toggle="validator" onSubmit={this.handleCheckOut}>
            <div className="checkout">
              <div className="container">
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputName" className="control-label">
                        First name
                </label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.onChange}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="inputLastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.onChange}
                        placeholder="Last Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                  <div className="form-group">
                      <label htmlFor="inputEmail">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder="Enter you email accout"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAddress">Address Line 1</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address1"
                        value={this.state.address1}
                        onChange={this.onChange}
                        placeholder="1234 Main St"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="inputAddress2">Address Line 2</label>
                      <input
                        type="text"
                        className="form-control"
                        name="address2"
                        value={this.state.address2}
                        onChange={this.onChange}
                        placeholder="Apartment, studio, or floor"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="inputCity">City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        value={this.state.city}
                        onChange={this.onChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="inputState">State</label>
                      <select
                        id="inputState"
                        className="form-control"
                        name="state"
                        value={this.state.state}
                        onChange={this.onChange}
                        required
                      >
                        <option defaultValue>Choose a State </option>
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
                      <label htmlFor="inputZip">Zip</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Zip"
                        value={this.state.Zip}
                        onChange={this.onChange}
                        placeholder="Zip"
                        required
                      />
                    </div>
                  </div>
              </div>
            </div>


          <div className="form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
                checked={this.state.checked}
                onChange={this.handleOnChange}
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Billing address same as shipping
                  </label>
            </div>
          </div>
          {this.state.checked ? null : (
            <div>
              <h3>Billing Address</h3>
                <div className="checkout">
                  <div className="container">
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputName" className="control-label">
                            First name
                </label>
                          <input
                            type="text"
                            className="form-control"
                            name="bfirstname"
                            value={this.state.bfirstname}
                            onChange={this.onChange}
                            placeholder="First name"
                            required
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputLastName">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="blastname"
                            value={this.state.blastname}
                            onChange={this.onChange}
                            placeholder="Last Name"
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="form-group">
                          <label htmlFor="inputAddress">Address Line 1</label>
                          <input
                            type="text"
                            className="form-control"
                            name="baddress1"
                            value={this.state.baddress1}
                            onChange={this.onChange}
                            placeholder="1234 Main St"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputAddress2">Address Line 2</label>
                          <input
                            type="text"
                            className="form-control"
                            name="baddress2"
                            value={this.state.baddress2}
                            onChange={this.onChange}
                            placeholder="Apartment, studio, or floor"
                          />
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputCity">City</label>
                          <input
                            type="text"
                            className="form-control"
                            name="bcity"
                            value={this.state.bcity}
                            onChange={this.onChange}
                            placeholder="City"
                            required
                          />
                        </div>
                        <div className="form-group col-md-4">
                          <label htmlFor="inputState">State</label>
                          <select
                            id="inputState"
                            className="form-control"
                            name="bstate"
                            value={this.state.bstate}
                            onChange={this.onChange}
                            required
                          >
                            <option defaultValue>Choose a State </option>
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
                          <label htmlFor="inputZip">Zip</label>
                          <input
                            type="text"
                            className="form-control"
                            name="bZip"
                            value={this.state.bZip}
                            onChange={this.onChange}
                            placeholder="Zip"
                            required
                          />
                        </div>
                      </div>
                  </div>
                </div>
            </div>
          )}
          <div className="form-row">
            <div
              style={{
                position: "relative",
                textAlign: "right",
                marginRight: "30px"
              }}
            >
              <button className="btn btn-primary" type="submit">
                Checkout
                </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CheckoutForm);
