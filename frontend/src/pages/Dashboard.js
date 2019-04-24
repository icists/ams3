import React from "react";

import PersonalInformation from "../containers/PersonalInformation";
import PaymentInformation from "../containers/PaymentInformation";

class Dashboard extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <PersonalInformation />
                <PaymentInformation />
            </div>
        );
    }
}

export default Dashboard;