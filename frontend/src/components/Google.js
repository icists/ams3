import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import {GoogleLogin} from "react-google-login"

require("dotenv").config();

class Google extends React.Component {
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
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={this.loginHandler}
                onFailure={this.loginHandler}
                cookiePolicy={'single_host_origin'}
            />
        );
    }
}

export default Google;