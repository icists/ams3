import React from "react";
import { Form, Input, TextArea, Button, Select, Dropdown } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react';
import { Divider } from 'semantic-ui-react';

import { COUNTRY_OPTIONS } from "../assets/countriesData.js"
import { SCHOOL_OPTIONS } from "../assets/schoolsData.js";

class RegisterInterface extends React.Component {
    constructor() {
        super();
        this.state = {
            nationalityOptions: COUNTRY_OPTIONS,
            genderOptions: [
                {
                    key: "Male",
                    text: "Male",
                    value: "Male"
                },
                {
                    key: "Female",
                    text: "Female",
                    value: "Female",
                },
                {
                    key: "Other",
                    text: "Other",
                    value: "Other"
                },
            ],
            channelOptions: [
                {
                    key: "Facebook",
                    text: "Facebook",
                    value: "Facebook"
                },
                {
                    key: "Instagram",
                    text: "Instagram",
                    value: "Instagram"
                },
                {
                    key: "Friend",
                    text: "Friend",
                    value: "Friend",
                },
                {
                    key: "Presentation",
                    text: "On-site Presentation",
                    value: "Presentation"
                },
                {
                    key: "Poster",
                    text: "Poster",
                    value: "Poster"
                },
            ]
        }
    }

    render() {
        return (
            <Grid textAlign="center">
                <Grid.Column width={10}>
                    <Form>
                        <Divider horizontal>Creat an Account</Divider>
                        <Form.Input fluid label="Email Address" placeholder="Email Address"/>
                        <Form.Group widths="equal" inline>
                            <Form.Input fluid label="Password" placeholder="Password"/>
                            <Form.Input fluid label="Password Confirm" placeholder="Password Confirm"/>
                        </Form.Group>
                        <Divider horizontal>Personal Information</Divider>
                        <Form.Group widths="equal" inline>
                            <Form.Input fluid label="First Name" placeholder="First Name"/>
                            <Form.Input fluid label="Last Name" placeholder="Last Name"/>
                        </Form.Group>
                        <Form.Group widths="equal">
                            <Dropdown
                                label="Gender"
                                placeholder="Gender"
                                fluid
                                selection
                                options={this.state.genderOptions}/>
                            <Dropdown
                                label="Nationality"
                                placeholder="Nationality"
                                fluid
                                selection
                                options={this.state.nationalityOptions}/>
                        </Form.Group>
                        <Form.Group widths="equal" inline>
                            <Dropdown
                                placeholder="School"
                                fluid
                                selection
                                options={this.state.schoolOptions}/>
                            <Form.Input
                                fluid
                                placeholder="Major"/>
                        </Form.Group>
                        <Divider horizontal>Simple Survey</Divider>
                        <Form.Group>
                            <Dropdown
                                placeholder="How did you know about ICISTS?"
                                fluid
                                selection
                                scrolling="false"
                                options={this.state.channelOptions}/>
                        </Form.Group>
                        <Form.Button>Submit</Form.Button>
                    </Form>
                </Grid.Column>
            </Grid>
        );
    }
}

export default RegisterInterface;