import React from "react";
import Select from "react-select";

import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";

import { compose } from "recompose";

import { genderOptions, channelOptions, schoolOptions } from "../../constants/applicatonOptions";
import countryList from 'react-select-country-list';

const INITIAL_STATE = {
    provision: false,
    nameFirst: "",
    nameLast: "",
    notification_email: "",
    school: "",
    major: "",
    essay: "",
    age: 0,
    sex: "",
    nationality: "",
    groupState: false,
    groupName: "",
    visa: false,
    channel: "",
    financialAid: false,
    prevParticipation: false,
    paymentCheck: false,
    otherChannel: "",
}

const range = (start, end) => {
    const length = end - start;
    return Array.from({ length }, (_, i) => start + i);
}

class ApplicationBase extends React.Component {
    constructor(props) {
        super(props);

        this.options = {
            countries: countryList().getData(),
            schools: schoolOptions.map(element => ({
                value: element.name,
                label: `(${element.country_code}) ${element.name}`
            })),
            genders: genderOptions.map(element => (
                <option value={element.text}>{element.text}</option>
            )),
            channels: channelOptions.map(element => (
                <option value={element.text}>{element.text}</option>
            )),
            ages: range(16, 36 + 1).map(element => (
                <option value={element}>{element}</option>
            ))
        }

        this.state = {
            ...INITIAL_STATE,
            schoolCountryCode: "",
            ableToSave: true,
        };

        this.props.firebase
            .userApplication(this.props.firebase.auth.currentUser.uid)
            .once('value', snapshot => {
                this.setState({
                    ...snapshot.val()
                })
            })
        
    }

    validateEmail = email => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onChange = event => {
        const target = event.target;
        const name = target.name;
        let value = target.value;
        let isEmailValid = true;
        if (target.type === "checkbox") {
            value = target.checked
        }
        if (target.name === "notification_email") {
            if (!this.validateEmail(value)) {
                isEmailValid = false;
            }
        }
        this.setState({
            [name]: value,
            ableToSave: isEmailValid,
        });
    }

    onNationalitySelectionChange = nationalityOption => {
        this.setState({
            nationality: nationalityOption,
        })
    }

    onSchoolSelectionChange = schoolOption => {
        this.setState({
            school: schoolOption,
        })
    }
    onSchoolCountrySelectionChange = schoolCountryOption => {
        this.setState({
            schoolCountryCode: schoolCountryOption,
        })
    }
    
    onSubmit = event => {
        const uid = this.props.firebase.auth.currentUser.uid;
        this.props.firebase.userApplication(uid).set({
            ...this.state,
            lastUpdate: (new Date()).toTimeString(),
        })
    }

    isValidState = () => {
        let valid = true
        return valid;
    }

    render() {
        return (
            <div className="application">
            <h1>ICISTS 2019 Application</h1>
            <div className="form-group">
            <form onSubmit={this.onSubmit}>
                <div className="app-name">
                    <h3>
                        Personal Information
                    </h3>
                        <div className="row">
                            <div className="col-md-2">
                                <label htmlFor="app-name-first-input">
                                    First Name
                                </label>
                            </div>
                            <div className="col-md-4">
                                <input
                                    className="app-name-first-input w-100 form-control"
                                    id="app-name-first-input"
                                    name="nameFirst"
                                    value={this.state.nameFirst}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder="First Name"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="app-name-last-input">
                                    Last Name
                                </label>
                            </div>
                            <div className="col-md-4">
                                    <input
                                        className="app-name-last-input w-100 form-control"
                                        id="app-name-last-input"
                                        name="nameLast"
                                        value={this.state.nameLast}
                                        onChange={this.onChange}
                                        type="text"
                                        placeholder="Last Name"
                                    />
                            </div>
                        </div>
                </div>
                <div className="app-sex-age">                
                    <div className="row">
                        <div className="col-md-2">
                            <label htmlFor="app-sex-select">Sex</label>
                        </div>
                        <div className="col-md-4">
                            <select
                                name="sex"
                                className="app-sex-select w-100 form-control"
                                onChange={this.onChange}
                                value={this.state.sex} >
                                <option value="" disabled selected>Your Sex</option>
                                {this.options.genders}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor="app-age-select">Age</label>
                        </div>
                        <div className="col-md-4">
                            <select
                                name="age"
                                className="app-age-select w-100 form-control"
                                onChange={this.onChange}
                                value={this.state.age}>
                                {this.options.ages}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="app-nsm">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="app-nationality">
                                <label htmlFor="app-nationality-select">Nationality</label>
                                <Select
                                    className="app-nationality-select w-100"
                                    name="nationality"
                                    options={this.options.countries}
                                    value={this.state.nationality}
                                    onChange={this.onNationalitySelectionChange} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="app-school">
                                <label htmlFor="app-school-select">School</label>
                                <Select
                                    name="school"
                                    className="app-school-select w-100"
                                    value={this.state.school}
                                    options={this.options.schools}
                                    onChange={this.onSchoolSelectionChange} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="app-major">
                                <label>
                                    Major
                                </label>
                                <input
                                    className="app-major-input w-100 form-control"
                                    name="major"
                                    value={this.state.major}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder="Broomstick Engineering"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="app-group">
                    <h3>
                        Group Participatioin
                    </h3>
                    <div className="row">
                        <div className="col-md-1">
                            <div className="app-group-check-box">
                                <input
                                    name="groupState"
                                    className="app-group-check form-control"
                                    type="checkbox"
                                    onChange={this.onChange}
                                    checked={this.state.groupState}
                                    value={this.state.groupState} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label className="app-group-check-label" htmlFor="app-group-check">
                                Are you participating in a group?
                            </label>
                        </div>
                        <div className="col-md-2">
                            Group Name
                        </div>
                        <div className="col-md-4">
                            <div>
                                <div className="app-group-name">
                                    <input
                                        className="app-group-name-input form-control"
                                        disabled={!this.state.groupState}
                                        name="groupName"
                                        value={this.state.groupName}
                                        onChange={this.onChange}
                                        type="text"
                                        placeholder="Your Group Name"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="app-contact">
                    <h3>
                        Contact
                    </h3>
                    <div className="row">
                        <div className="col-md-1">
                            <label htmlFor="app-email-select">Email</label>
                        </div>
                        <div className="col-md-5">
                            <input
                                className="app-email-select w-100 form-control"
                                name="notification_email"
                                value={this.state.notification_email}
                                onChange={this.onChange}
                                placeholder="Email address to get notified from ICISTS"
                                type="email"/>
                        </div>
                        <div className="col-md-6">
                            <p className="text-center">
                                <div className="app-contact-email-invalid-email">
                                    { !this.state.ableToSave ? <div className="app-email-alert alert alert-danger">Please check your email!</div> : "" }
                                </div>
                                <div className="app-contact-email-info">
                                    We will send you information email via this address.
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="app-as">
                    <h3>
                        Agreements & Supports
                    </h3>
                    <div className="row">
                        <div className="col-md-1">
                            <div className="app-provision">
                                <input
                                    name="provision"
                                    className="app-provision-check form-control"
                                    onChange={this.onChange}
                                    type="checkbox"
                                    checked={this.state.provision}
                                    value={this.state.provision} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label className="app-provision-check-label" htmlFor="app-provision-check">
                                Do you agree with the provision?
                            </label>    
                        </div>
                        <div className="col-md-1">
                            <div className="app-prev-participation">
                                <input
                                    name="prevParticipation"
                                    className="app-prev-participation-check form-control"
                                    onChange={this.onChange}
                                    type="checkbox"
                                    checked={this.state.prevParticipation}
                                    value={this.state.prevParticipation} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label className="app-prev-participation-check" htmlFor="app-prev-participation-check">
                                Have you participated ICISTS before?
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <div className="app-visa">
                                <input
                                    name="visa"
                                    className="app-visa-check form-control"
                                    onChange={this.onChange}
                                    type="checkbox"
                                    checked={this.state.visa}
                                    value={this.state.visa} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label className="app-visa-check-label" htmlFor="app-visa-check">
                                Do you need a support for visa?
                            </label>
                        </div>
                        <div className="col-md-1">
                            <div className="app-financial-aid">
                                <input
                                    name="financialAid"
                                    className="app-financial-aid-check form-control"
                                    onChange={this.onChange}
                                    type="checkbox"
                                    checked={this.state.financialAid}
                                    value={this.state.financialAid} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <label className="app-financial-aid-check-label" htmlFor="app-provision-check">
                                Do you need financial aid?
                            </label>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="app-payment">
                    <h3>
                        Payment
                    </h3>
                    <div className="row">
                        <div className="col-md-3">
                            <p>Your payment is {this.state.paymentCheck ? "" : "not"} verified</p>
                        </div>
                        <div className="col-md-1">
                            <input
                            disabled
                            name="paymentCheck"
                            className="app-payment-check-check form-control"
                            onChange={this.onChange}
                            type="checkbox"
                            checked={this.state.paymentCheck}
                            value={this.state.paymentCheck} />
                        </div>
                        <div className="col-md-8">
                            If you have any concern about payment, please contact us.
                        </div>
                    </div>
                </div>
                <hr />
                <div className="app-essay">
                    <div className="row">
                        <div className="col">
                            <h3>Essay</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <textarea
                                className="app-essay-input form-control"
                                rows="10"
                                name="essay"
                                onChange={this.onChange}
                                value={this.state.essay} />
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="app-channel">
                    <div className="row">
                        <div className="col-md-8">
                            <label htmlFor="app-channel-select">
                                How did you know about ICISTS?
                            </label>
                        </div>
                        <div className="col-md-4">
                            <select
                            name="channel"
                            className="app-channel-select form-control"
                            onChange={this.onChange}
                            value={this.state.channel} >
                                <option value="" disabled selected>I've heard about ICISTS from...</option>
                                {this.options.channels}
                        </select>
                        </div>
                    </div>
                        {this.state.channel === "Other" ?
                            <div className="row">
                                    <input
                                    className="app-channel-other form-control"
                                    name="otherChannel"
                                    value={this.state.otherChannel}
                                    onChange={this.onChange}
                                    type="text"
                                    placeholder="How did you know about ICISTS?"
                                    />
                            </div>
                        : <div></div>}
                </div>
                <div className="app-save">
                    <div className="app-alert row alert alert-primary">
                            <div className="col-md-9">
                                <p className="text-center">Your application is saved at {this.state.lastUpdate}</p>
                            </div>
                            <div className="col-md-2">
                                <button disabled={!this.state.ableToSave} type="submit" className="btn btn-primary w-100">
                                    Save
                                </button>
                            </div>
                            <div className="col-md-auto"></div>
                    </div>
                </div>
                </form>
                </div>
            </div>
        );
    }
}

const condition = authUser => authUser != null;

const Application = compose(
    withEmailVerification,
    withAuthorization(condition),
    withFirebase
)(ApplicationBase);

export default Application;