import React from "react";

import { withAuthorization } from "../Session";

const HomePage = () => {
    return (
        <div>
            <h1>
                ICISTS Application Home
            </h1>
        </div>
    );
}

const condition = authUser => authUser != null

export default withAuthorization(condition)(HomePage);