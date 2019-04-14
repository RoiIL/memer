import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

class App extends Component {

  state = {
    message: null,
    email: "",
    userName: "",
    password: ""
  }

  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav pullRight>
            <NavItem href="/signup">Signup</NavItem>
            <NavItem href="/login">Login</NavItem>
          </Nav>
        </Navbar.Collapse>
        </Navbar>
        <Routes />
      </div>
    );
  }

  getMessageFromServer = () => {
    axios.get("/logIn")
      .then(res => this.setState({ message: res.data.message }));
  };

  signUp = () => {
    let user = this.state;
    axios.post("/signUp", user)
    .then(res => this.setState({ message: res.data.message }));
  };
}

export default App;
