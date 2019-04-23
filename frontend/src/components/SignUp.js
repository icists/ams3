import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment, GridColumn } from "semantic-ui-react";

class SignUp extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
        <Grid textAlign="center">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Message >
                    Not registerd yet? <a href='#'>Sign Up</a>
                </Message>
            </Grid.Column>
        </Grid>
        );
    }
}

export default SignUp;