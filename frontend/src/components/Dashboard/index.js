import React from "react";

import { withAuthorization, withEmailVerification } from "../Session";
import { compose } from "recompose";

const Dashboard = () => {
    return (
        <div>
            <h1>
                ICISTS Application Home
            </h1>
        </div>
    );
}

const condition = authUser => authUser != null

export default compose(
    withEmailVerification,
    withAuthorization(condition)
)(Dashboard);