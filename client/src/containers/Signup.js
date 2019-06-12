import React, { Component } from 'react';
import Axios from "axios";
import { Button, FormGroup, FormControl, ControlLabel, Collapse } from "react-bootstrap";
import "../style/Signup.css";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      userName: "",
      password: "",
      errorMessage: ""
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

  submitSignup = async event => {
    event.preventDefault();
    try {
      let user = this.state;
      await Axios.post("/v1/signup", user)
      .then((response) => {
        if (response.data.status !== undefined)
        {
          this.setState({errorMessage: 'Error ' + response.data.status + ': ' + response.data.message});
        } else {
          this.props.history.push("/userProfile");
        }});     
    } 
    catch (exception) {
      alert(exception.message);
    }
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
          <Collapse in={this.state.errorMessage}>
          <p className="ErrorMessage">{this.state.errorMessage}</p>
          </Collapse>  
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
