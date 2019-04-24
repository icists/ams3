import React from 'react';
import './App.css';

import Title from "./components/Title.js";

import MainPage from "./pages/MainPage.js";


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      titleText: "ICISTS Application",
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-Title">
          <Title titleText={this.state.titleText}/>
        </div>
        <div className="App-Register">
          <MainPage/>
        </div>
      </div>
    );
  }
}

export default App;
