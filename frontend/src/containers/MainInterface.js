import React from "react";

import NormalLoginForm from "../components/NormalLoginForm.js"
import GoogleLoginButton from "../components/GoogleLoginButton.js"
import FacebookLoginButton from "../components/FacebookLoginButton.js"
import SignUp from "../components/SignUp.js"
import { Divider } from "semantic-ui-react";

class MainInterface extends React.Component {
  constructor() {
    super();
    this.googleLoginHandlerFn = this.googleLoginHandler.bind(this);
    this.facebookLoginHandlerFn = this.facebookLoginHandler.bind(this);
  }

  googleLoginHandler = (res) => {
    this.setState({
      users: res.w3.ig
    })
  }

  facebookLoginHandler = (res) => {
    this.setState({
      users: res.name
    })
  }

  render() {
    return (
      <div>
        <NormalLoginForm/>
        <Divider horizontal>Or Login With</Divider>
        <GoogleLoginButton handler={this.googleLoginHandlerFn}/>
        <FacebookLoginButton handler={this.facebookLoginHandlerFn}/>
        <Divider horizontal>Not Registered Yet?</Divider>
        <SignUp/>
      </div>
    );
  }
}

export default MainInterface;