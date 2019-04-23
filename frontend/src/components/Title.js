import React from "react";
import ReactDOM from "react-dom";

import { Header } from "semantic-ui-react";

const Title = (props) => {
    return (
        <div className="page title">
            <Header as='h1'>{props.titleText}</Header>
        </div>
    );
}

export default Title;