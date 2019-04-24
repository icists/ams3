import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { GoogleLogin } from "react-google-login"

require("dotenv").config();

class GoogleLoginButton extends React.Component {
    constructor() {
        super();
    }

    loginHandler = (res) => {
        console.log(res)
    }

    render() {
        return (
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                onSuccess={this.props.handler}
                onFailure={this.props.handler}
                cookiePolicy={'single_host_origin'}
                icon = {false}
                buttonText = "Sign in with google"
                className="GoogleBtn"
            />
        );
    }
}

export default GoogleLoginButton;