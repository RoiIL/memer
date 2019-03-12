import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {

  state = {
    message: null,
    email: "",
    userName: "",
    password: ""
  }

  render() { 
  return (
    <div>
      <div style={{ padding: "10px" }}>
        <input
          type="text"
          onChange = {e => this.setState({ message: e.target.value })}
          placeholder="add something in the database"
          style={{ width: "200px" }}
        />
        <button onClick = {() => this.getMessageFromServer(this.state.message)}>
          LogIn
        </button>
        <p>{this.state.message}</p>
      </div>

      <div style={{ padding: "10px" }}>
        <input
          type = "text"
          onChange = {email => this.setState({ email: email.target.value })}
          placeholder= "Email"
          style={{ width: "200px" }}
        />
        <input  
          type = "text"
          onChange = {userName => this.setState({ userName: userName.target.value })}
          placeholder = "User Name"
          style={{ width: "200px" }}
        />
        <input
          type = "text"
          onChange = {password => this.setState({ password: password.target.value })}
          placeholder = "Password"
          style={{ width: "200px" }}
        />
        <button onClick = {() => this.signUp(this.state)}>
          Add User
        </button>
        <p>{this.state.message}</p>
      </div>
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
