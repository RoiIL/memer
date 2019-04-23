import React, { Component } from 'react';
import Axios from "axios";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../style/Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      message: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 &&
     this.state.password.length > 0;
  }

  onChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  submitLogin = async event => {
    event.preventDefault();
  
    try {
      let user = this.state;
      await Axios.post("/login", user);
      this.props.history.push("/userProfile");
    } catch (exception) {
      alert(exception.message);
    }
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.submitLogin}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.onChange}
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
            Login
          </Button>
        </form>
      </div>
    );
  }
}