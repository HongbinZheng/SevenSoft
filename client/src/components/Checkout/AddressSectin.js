import React, { Component } from 'react';
import axios from 'axios'

import Authserver from '../authserver'

class AddressSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname:'',
      lastname:'',
      address1: '',
      address2: '',
      city: '',
      state: '',
      Zip: '',
      username: '',
      complete: false
    }
    this.Auth = new Authserver()
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    if(this.Auth.loggedIn())
   { var username = this.Auth.getUserName()
    this.setState({ username: username })
    axios.get(`/api/getAddress?username=${username}`)
      .then(res => {
        console.log(res.data)
        if(res.data)
        {this.setState(res.data)}
      })}
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <div className="container">
          <form>
          <div className="form-row">
            <div className="form-group col-md-6">
            <label htmlFor="validationServer01">First name</label>
            <input type="text" className="form-control" name="firstname" onChange={this.onChange} placeholder="First name" required/>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLastName">Last Name</label>
              <input type="text" className="form-control" name="lastname" onChange={this.onChange} placeholder="Last Name" required/>
            </div>
          </div>
            <div className="form-group">
              <div className="form-group">
                <label htmlFor="inputAddress">Address 1</label>
                <input type="text" className="form-control" name="address1" value={this.state.address1} onChange={this.onChange} placeholder="1234 Main St" required/>
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress2">Address 2</label>
                <input type="text" className="form-control" name='address2' value={this.state.address2} onChange={this.onChange} placeholder="Apartment, studio, or floor" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" name='city' value={this.state.city} onChange={this.onChange} placeholder="City" required/>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select id="inputState" className="form-control" name='state' value={this.state.state} onChange={this.onChange} required>
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
                <input type="text" className="form-control" name='Zip' value={this.state.Zip} onChange={this.onChange} placeholder="Zip" required/>
              </div>
            </div>
          </form>
        </div>

      </div>

    );
  }
}


export default AddressSection;