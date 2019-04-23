import React from "react";

import Login from "../components/Login.js"
import SignUp from "../components/SignUp.js"

class MainInterface extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Login/>
        <SignUp/>
      </div>
    );
  }
}

export default MainInterface;