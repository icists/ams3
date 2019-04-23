import React from 'react';
import './App.css';

import Title from "./components/Title.js";

import Register from "./containers/Register.js";
import Application from "./containers/Application.js";

import backgroundImage from "./assets/background.jpg"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      titleText: "ICISTS Applicatoin",
      signedIn: false,

      colors: {
        icistsBlue: '#09073B',
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-Title">
          <Title titleText={this.state.titleText}/>
        </div>
        <div className="App-Register">
          <Register color={this.state.colors.icistsBlue}/>
        </div>
        <Application/>
      </div>
    );
  }
}

export default App;
