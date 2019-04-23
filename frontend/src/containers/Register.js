import React from "react";

import Login from "../components/Login.js"
import SignUp from "../components/SignUp.js"

class Register extends React.Component {
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

export default Register;