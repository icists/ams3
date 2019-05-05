import React from "react";
import Select from "react-select";

import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";

import { compose } from "recompose";

import { genderOptions, channelOptions, schoolOptions } from "../../constants/applicatonOptions";
import countryList from 'react-select-country-list';
import { IApplicationForm, IApplicationState, IApplicationOptions } from "./interface";

/**
 * Template for application form
 */

const INITIAL_STATE: IApplicationForm = {
  nameFirst: undefined,
  nameLast: undefined,
  sex: undefined,
  birthDate: undefined,
  nationality: undefined, 
  school: undefined,
  major: undefined,

  phoneNumber: undefined,
  notificationEmail: undefined,
  essay: undefined,
  groupState: false,
  groupName: undefined,
  provisionAgreement: false,
  visaSupport: false,
  channel: undefined,
  financialAid: false,
  prevParticipation: false,
  paymentCheck: false,
  otherChannel: undefined,
  lastUpdate: undefined
}

const range = (start: number, end: number) => {
  const length = end - start;
  return Array.from({ length }, (_, i) => start + i);
}

class ApplicationBase extends React.Component<
  any,
  IApplicationForm> {
  options: IApplicationOptions

  constructor(props: any) {
    super(props);

    this.options = {
      countries: countryList().getData(),
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
    };

    this.props.firebase
      .userApplication(this.props.firebase.auth.currentUser.uid)
      .once('value', (snapshot: any) => {
        this.setState({
          ...snapshot.val()
        })
      })
  }

  validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  onInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    this.setState((current) => ({
      ...current,
      [target.name]: target.value,
    }));
  }

  onTextAreaEssayChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    this.setState((current) => ({
      ...current,
      [target.name]: target.value,
    }));
  }

  onInputCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    this.setState((current) => ({
      ...current,
      [target.name]: target.checked,
    }));
  }

  onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const target = event.currentTarget;
    this.setState((current) => ({
      ...current,
      [target.name]: target.value,
    }));
  }

  onNationalitySelectionChange = (nationalityOption: any) => {
    this.setState((current) => ({
      ...current,
      nationality: nationalityOption,
    }))
  }

  validateSubmitEntry = (entry: IApplicationForm): boolean => {
    let isValid = true;
    Object.keys(entry).forEach((key) => {
      if (typeof entry[key] === 'undefined') {
        isValid = false;
        return;
      }
    })
    if (entry.lastUpdate === undefined) {
      return true;
    }

    if (entry.otherChannel === undefined) {
      return true;
    }
    return isValid;
  }
  
  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // For invalid entry submitted
    if (!this.validateSubmitEntry(this.state)) {
      event.preventDefault();
      alert("Please check if you missed something :)");
      return;
    }
    const uid = this.props.firebase.auth.currentUser.uid;
    this.props.firebase.userApplication(uid).set({
      ...this.state,
      otherChannel: this.state.otherChannel === undefined ? "" : this.state.otherChannel,
      lastUpdate: (new Date()).toTimeString(),
    });
  }

  public render() {
    console.log(this.state); // For Debugging
    return (
      <div className="application">
      <h1>ICISTS 2019 Application</h1>
      <div className="form-group">
      <form onSubmit={this.onSubmit}>
        <div className="app-name">
          <h3> Personal Information </h3>
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
                    type="text"
                    onChange={this.onInputTextChange}
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
                    type="text"
                    onChange={this.onInputTextChange}
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
                    onChange={this.onSelectChange}
                    value={this.state.sex} >
                    <option value="" disabled={true} selected={true}>Your Sex</option>
                    {this.options.genders}
                </select>
            </div>
            <div className="col-md-2">
                <label htmlFor="app-age-select">Date of Birth</label>
            </div>
            <div className="col-md-4">
                <input
                    name="birthDate"
                    className="app-age-select w-100 form-control"
                    placeholder="MM/DD/YYYY"
                    type="text"
                    value={this.state.birthDate}
                    onChange={this.onInputTextChange}
                     />
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
                        <input
                            className="app-school-select w-100 form-control"
                            name="school"
                            value={this.state.school}
                            type="text"
                            onChange={this.onInputTextChange}
                            placeholder="Your School"
                        />
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
                            type="text"
                            onChange={this.onInputTextChange}
                            placeholder="Broomstick Engineering"
                        />
                    </div>
                </div>
            </div>
        </div>
        <hr/>
        <div className="app-group">
            <h3>
                Group Participation
            </h3>
            <div className="row">
                <div className="col-md-1">
                    <div className="app-group-check-box">
                        <input
                            name="groupState"
                            className="app-group-check form-control"
                            type="checkbox"
                            onChange={this.onInputCheckboxChange}
                            checked={this.state.groupState}
                            />
                    </div>
                </div>
                <div className="col-md-5">
                    <label className="app-group-check-label" htmlFor="app-group-check">
                        Check if you are participating as a group
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
                                type="text"
                                onChange={this.onInputTextChange}
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
                        name="notificationEmail"
                        value={this.state.notificationEmail}
                        onChange={this.onInputTextChange}
                        placeholder="Email address to get notified from ICISTS"
                        type="text"/>
                </div>
                <div className="col-md-6">
                    {/* <p className="text-center">
                        <div className="app-contact-email-invalid-email">
                            { !this.state.ableToSave ? <div className="app-email-alert alert alert-danger">Please check your email!</div> : "" }
                        </div>
                        <div className="app-contact-email-info">
                            We will send you information email via this address.
                        </div>
                    </p> */}
                </div>
            </div>
            <div className="row">
                <div className="col-md-1">
                    <label htmlFor="app-phone-number-input">Email</label>
                </div>
                <div className="col-md-5">
                    <input
                        className="app-phone-number-input w-100 form-control"
                        name="phoneNumber"
                        value={this.state.phoneNumber}
                        onChange={this.onInputTextChange}
                        placeholder="Your Phone Number"
                        type="text"/>
                </div>
                <div className="col-md-6">
                    {/* <p className="text-center">
                        <div className="app-contact-email-invalid-email">
                            { !this.state.ableToSave ? <div className="app-email-alert alert alert-danger">Please check your email!</div> : "" }
                        </div>
                        <div className="app-contact-email-info">
                            We will send you information email via this address.
                        </div>
                    </p> */}
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
                            name="provisionAgreement"
                            className="app-provision-check form-control"
                            type="checkbox"
                            onChange={this.onInputCheckboxChange}
                            checked={this.state.provisionAgreement}
                            // value={this.state.provision} 
                            />
                    </div>
                </div>
                <div className="col-md-5">
                    <label className="app-provision-check-label" htmlFor="app-provision-check">
                        Check if you agree with the provision
                    </label>    
                </div>
                <div className="col-md-1">
                    <div className="app-prev-participation">
                        <input
                            name="prevParticipation"
                            className="app-prev-participation-check form-control"
                            type="checkbox"
                            onChange={this.onInputCheckboxChange}
                            checked={this.state.prevParticipation}
                        />
                    </div>
                </div>
                <div className="col-md-5">
                    <label className="app-prev-participation-check" htmlFor="app-prev-participation-check">
                        Check if you have participated ICISTS before
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col-md-1">
                    <div className="app-visa">
                        <input
                            name="visaSupport"
                            className="app-visa-check form-control"
                            type="checkbox"
                            onChange={this.onInputCheckboxChange}
                            checked={this.state.visaSupport}
                        // value={this.state.visa}
                        />
                    </div>
                </div>
                <div className="col-md-5">
                    <label className="app-visa-check-label" htmlFor="app-visa-check">
                        Check if you need a visa supporting letter to enter South Korea
                    </label>
                </div>
                <div className="col-md-1">
                    <div className="app-financial-aid">
                        <input
                            name="financialAid"
                            className="app-financial-aid-check form-control"
                            type="checkbox"
                            onChange={this.onInputCheckboxChange}
                            checked={this.state.financialAid}
                            // value={this.state.financialAid}
                        />
                    </div>
                </div>
                <div className="col-md-5">
                    <label className="app-financial-aid-check-label" htmlFor="app-provision-check">
                        Check if you are applying for financial aid
                        <br />
                        <small>You have to write an essay to apply this</small>
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
                    disabled={true}
                    name="paymentCheck"
                    className="app-payment-check-check form-control"
                    type="checkbox"
                    onChange={this.onInputCheckboxChange}
                    checked={this.state.paymentCheck}
                    // value={this.state.paymentCheck}
                    />
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
                        rows={10}
                        name="essay"
                        onChange={this.onTextAreaEssayChange}
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
                    onChange={this.onSelectChange}
                    value={this.state.channel} >
                        <option value="" disabled={true} selected={true}>I've heard about ICISTS from...</option>
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
                            onChange={this.onInputTextChange}
                            type="text"
                            placeholder="How did you know about ICISTS?"
                            />
                    </div>
                : <div/>}
        </div>
        <div className="app-save">
            <div className="app-alert row alert alert-primary">
                    <div className="col-md-9">
                        <p className="text-center">Your application is saved at {this.state.lastUpdate}</p>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className="btn btn-primary w-100">
                            Save
                        </button>
                    </div>
                    <div className="col-md-auto"/>
            </div>
          </div>
          </form>
          </div>
      </div>
    );
  }
}

const condition = (authUser: any) => authUser != null;

const Application = compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(ApplicationBase);

export default Application;