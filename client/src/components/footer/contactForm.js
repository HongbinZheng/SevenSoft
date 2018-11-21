import React, { Component } from "react";
import emailjs from "emailjs-com";

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

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this);
    var templateParams = {
      name: "boy"
    };
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label>Name</label>
        <input type="text" ref="email" />
        <label>email</label>
        <input type="text" ref="email" />
        <label>feedback</label>
        <textarea
          type="submit"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="How can we help?"
        />
        <button type="submit" onClick={this.handleSubmit()}>
          Send Feedback
        </button>
      </form>
    );
  }
}

export default ContactForm;
