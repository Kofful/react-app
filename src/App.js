import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isEmailValid: false
    };
    this.onTextChange = this.onTextChange.bind(this);
  }
  render() {
    return (
      <div className="App">
      <primaryInput
      placeholder = {"Email"}
      type={"email"}
      errorMessage={"Email is not valid"}
      isDataValid={this.state.isEmailValid}
      title={"Email"}
      onTextChange={this.onTextChange}
      value={this.state.email}
      />
      </div>
    );
  }
  onTextChange(text, fieldName) {
    this.setState({[fieldName]: text})
  }
}

export default App;
