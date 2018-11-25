import React, { Component } from "react";
import emailjs from "emailjs-com";
import axios from 'axios';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      name: "",
      email: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
}

  //trying to use this function to call the emailjs.send method
  
  handleSubmit(event) {
    //event.preventDefault();
    var templateParams = {
      user_name: this.state.name,
      user_email: this.state.email,
      text: this.state.text
  }
   
  window.emailjs.send('sevenfreshsjsu','contact_form', templateParams,'user_BNWtYQ24dMliuJ44XBgy3')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(err) {
         console.log('FAILED...', err);
      });
  }

  render() {
    return (
      <div className="container" style={{width:500,height:400,textAlign:'center'}}>
      <form>
        <label>Name</label><br/>
        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} style={{width:300}}/>
        <div>
          <label>email</label><br/>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} style={{width:300}}/>
        </div>
        <div>
          <label>feedback</label>
          <textarea
            value={this.state.text}
            name='text'
            onChange={this.handleChange}
            placeholder="How can we help?"
            style={{width:450,height:250}}
          />
        </div>
        <button className='btn btn-info' onClick={this.handleSubmit}>
          Send Feedback
        </button>
      </form>
      
      </div>
    );
  }
}

export default ContactForm;
