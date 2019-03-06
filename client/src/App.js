import React, { Component } from 'react';

class App extends Component {

  state = {
    message: null
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
      </div>
    </div>
  );
  }

  getMessageFromServer = () => {
    fetch("/LogIn")
      .then(message => message.json())
      .then(res => console.log(res.message))
      .then(res => this.setState({ message: res.message }));
  };
}

export default App;
