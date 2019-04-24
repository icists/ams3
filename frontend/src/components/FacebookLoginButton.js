import React from "react";
import { Icon } from "semantic-ui-react";
import FacebookLogin from "react-facebook-login"; // DO NOT Change this line to import { FacebookLogin } ...

require("dotenv").config();

class FacebookLoginButton extends React.Component {
    constructor() {
        super();
    }

    responseFacebook = (res) => {
        console.log(res);
    }

    render() {
        return (
            <FacebookLogin
            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
            autoLoad={false}
            fields="name,email,picture"
            callback={this.props.handler}
            cssClass="FacebookBtn"
            icon={<Icon name="facebook official" />}
            textButton = "Sign In with Facebook"
        />
        );
    }
}

export default FacebookLoginButton;