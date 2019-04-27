import React from "react";

import { withAuthorization } from "../Session";


const INITIAL_STATE = {
    provision: false,
    name: "",
    notification_email: "",
    school: "",
    major: "",
    essay: "",
    age: 0,
    sex: "",
    nationality: "",
    group: false,
    visa: false,
    fiAid: false,
    prev: false,
}

class ApplicationBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

const condition = authUser => authUser != null;
const Application = withAuthorization(condition)(ApplicationBase);

export default Application;