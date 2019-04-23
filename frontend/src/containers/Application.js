import React from "react";

import ButtonComponent from "../components/Button.js";

class Application extends React.Component {
    constructor() {
        super();
        this.state = {
            applicatoinButtonText: "Sign In"
        }
    }

    render() {
        return (
            <div className="page-application">
                <ButtonComponent text={this.state.applicatoinButtonText} />
            </div>
        );
    }
}

export default Application;