import React from "react";

import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";
import { compose } from "recompose";

class DashboardBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        const uid = this.props.firebase.auth.currentUser.uid;
        this.props.firebase
            .userApplication(uid)
            .once('value', snapshot => {
                this.setState({
                    ...snapshot.val()
                })
            })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <div className="dashboard-application">
                    <hr>Personal Information</hr>
                    {this.state.nameFirst}
                    {this.state.nameLast}
                    {this.state.age}
                    {this.state.sex}
                    {this.state.nationality}
                    {this.state.school}
                    {this.state.major}
                    <hr>Application Information</hr>
                    {this.state.groupState}
                    {this.state.groupName}
                    {this.state.finalcialAid}
                    {this.state.prevParticipation}
                    {this.state.provision}
                    {this.state.visa}
                    {this.state.notification_email}
                </div>
            </div>
        );
    }
}

const condition = authUser => authUser != null
const Dashboard = compose(
    withFirebase,
    withEmailVerification,
    withAuthorization(condition)
)(DashboardBase);

export default Dashboard;