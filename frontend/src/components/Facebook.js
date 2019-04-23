import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import FacebookLogin from "react-facebook-login";

require("dotenv").config();
class Facebook extends React.Component {
    constructor() {
        super();
    }

    responseFacebook = (res) => {
        console.log(res)
    }

    render() {
        return (
            <FacebookLogin
                appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                autoLoad={true}
                fields="name,email,picture"
                callback={this.responseFacebook}
            />
        );
    }
}

export default Facebook;