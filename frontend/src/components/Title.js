import React from "react";
import ReactDOM from "react-dom";

import { Header } from "semantic-ui-react";

import "../App.css";

const Title = (props) => {
    return (
        <div className="Title-Header">
            <Header as='h1'>{props.titleText}</Header>
        </div>
    );
}

export default Title;