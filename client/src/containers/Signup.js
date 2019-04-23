import React, { Component } from 'react';
import Axios from "axios";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../style/Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      userName: "",
      password: ""
    };
  }

  validateForm() {
    const bIsValid = this.state.email.length > 0 &&
     this.state.userName.length > 0 &&
     this.state.password.length > 0;
     return bIsValid;
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  submitSignup = () => {
    let user = this.state;
    Axios.post("/signup", user);
  }

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.submitSignup}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup controlId="userName" bsSize="large">
            <ControlLabel>User Name</ControlLabel>
            <FormControl
              value={this.state.userName}
              onChange={this.onChange}
              type="text"
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.onChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Signup
          </Button>
        </form>
      </div>
    );
  }
}
