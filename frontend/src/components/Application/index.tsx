import React from "react";

import { withAuthorization, withEmailVerification } from "../Session";
import { withFirebase } from "../Firebase";

import { compose } from "recompose";

import { genderOptions, channelOptions, schoolOptions } from "../../constants/applicatonOptions";
import countryList from 'react-select-country-list';

import { IApplicationForm, IApplicationState, IApplicationOptions } from "./interface";

import { provision } from "../../constants/provision";
import { essayProposition, essayTopic1, essayContent1_1, essayContent1_2,essayTopic2, essayContent2_1, essayContent2_2  } from '../../constants/essayTopic';

/**
 * Template for application form
 */
const INITIAL_STATE: IApplicationForm = {
  nameFirst: "",
  nameLast: "",
  sex: "Male",
  birthDate: "",
  nationality: "Korea, Republic of", 
  school: "",
  major: "",

  phoneNumber: "",
  notificationEmail: "",

  essayTopic: "",
  essay: "",
  essayWordCount: 0,

  groupState: false,
  groupName: "",
  provisionAgreement: false,
  visaSupport: false,
  financialAid: false,
  financialAidEssay: "",
  dormUse: false,
  prevParticipation: false,
  
  channel: "----------",
  otherChannel: "",

  paymentCheck: false,

  lastUpdate: ""
}

class ApplicationBase extends React.Component<
  any,
  IApplicationForm & IApplicationState> {
  options: IApplicationOptions
  essayMinWordCount: number = 300
  constructor(props: any) {
    super(props);

    this.state = {
      ...INITIAL_STATE,
    };

    this.options = {
      countries: countryList().getData().map((element: {
        value: string;
        label: string;
      }) => (
        <option value={element.label}>{element.label}</option>
      )),
      genders: genderOptions.map(element => (
        <option value={element.text}>{element.text}</option>
      )),
      channels: channelOptions.map(element => (
        <option value={element.text}>{element.text}</option>
      ))
    }

    this.props.firebase
      .userApplication(this.props.firebase.auth.currentUser.uid)
      .once('value', (snapshot: any) => {
        this.setState({
          ...snapshot.val()
        })
      })
  }

  private forceFirstUpper = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
  }

  private validateDate = (date?: string) => {
    if (date === undefined)
      return false;
    const re = /^((0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/](19|20)[0-9]{2})*$/;
    return !re.test(date);
  }

  private validateEmail = (email?: string) => {
    if (email === undefined)
      return false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email.toLowerCase());
  }
  
  private validateSubmitEntry = (entry: IApplicationForm): boolean => {
    let isValid = true;
    const keys = Object.keys(entry);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];

      // Must agree with the provision
      if (key === 'provisionAgreement') {
        if (entry[key] === false) {
          return false;
        }
      }

      if (key === 'lastUpdate')
        continue;
      if (key === 'essay')
        continue;
      if (key === 'financialAidEssay')
        continue;
      if (key === 'otherChannel')
        continue;
      if (key === 'groupName')
        continue;

      if (typeof (entry[key]) === 'string') {
        if (entry[key].length === 0) {
          isValid = false;
        }  
      }

    }

    return isValid;
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
      essayWordCount: target.value.trim() === "" ? 0 : target.value.trim().split(/\s+/).length,
    }));
  }
  
  onTextAreaFiEssayChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    this.setState((current) => ({
      ...current,
      [target.name]: target.value,
    }))
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

  onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    this.setState((current) => ({
      ...current,
      essayTopic:target.id,
    }))
  }

  onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // For invalid entry submitted
    if (!this.validateSubmitEntry(this.state)) {
      alert("Please fill or select all information");
      event.preventDefault();
      return;
    }
    const uid = this.props.firebase.auth.currentUser.uid;
    // You have to sanitize undefined data!
    this.props.firebase.userApplication(uid).set({
      ...this.state,
      nameFirst: this.forceFirstUpper(this.state.nameFirst as string),
      nameLast: this.forceFirstUpper(this.state.nameLast as string),
      groupName: this.state.groupName === undefined ? "" : this.state.groupName,
      otherChannel: this.state.otherChannel === undefined ? "" : this.state.otherChannel,
      financialAidEssay: this.state.financialAidEssay === undefined ? "" : this.state.financialAidEssay,
      lastUpdate: (new Date()).toTimeString(),
    });
  }

  render() {
    const timeRemained = () => {
      const now = new Date().getTime();
      const DDay = new Date("May 31, 2019 23:59:59").getTime();
      const distance = DDay - now;
      const d = Math.floor(distance / (1000 * 60 * 60 * 24));

      return `${d} day(s)`
    }
    return (
      <div className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
        <div className="application">
          <h1>ICISTS 2019 Application</h1>
          <div className="row">
            <div className="col">
              <textarea
                disabled={true}
                className="application-remainders form-control"
                rows={5}
                value="1. Please fill all the information in English.
    2. You can save it after filling out all the information.
    3. You can save it without writing 300 words of an essay, but you should write more than 1 word to save.
    4. After the early application is completed, it will be submitted automatically.
    5. Contact us for any type of inquiry regarding your application - Email: help@icists.org"/>
            </div>
          </div>
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
                    value={this.state.sex}
                  >
                    <option selected={true} disabled={true}>
                      Your Sex
                    </option>
                    {this.options.genders}
                  </select>
                </div>
                <div className="col-md-2">
                  <label htmlFor="app-birth-date-input">Date of Birth</label>
                </div>
                <div className="col-md-4">
                    <input
                      name="birthDate"
                      className="app-birth-date-input w-100 form-control"
                      placeholder="MM/DD/YYYY"
                      type="text"
                      value={this.state.birthDate}
                      onChange={this.onInputTextChange}
                    />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="app-birth-date-invalid-date">
                  {this.validateDate(this.state.birthDate)
                  ? <div className="app-birth-alert alert alert-danger">
                    Please check your date of birth. (MM/DD/YYYY)
                  </div>
                  : <div />}
                </div>
              </div>
            </div>
            <div className="app-nsm">
              <div className="row">
                  <div className="col-md-4">
                    <div className="app-nationality">
                      <label htmlFor="app-nationality-select">Nationality</label>
                      <select
                        name="nationality"
                        className="app-nationality-select w-100 form-control"
                        onChange={this.onSelectChange}
                        value={this.state.nationality}
                      >
                        <option disabled={true} selected={true}>
                          Your Country
                        </option>
                        {this.options.countries}
                      </select>
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
                <h3> Group Participation </h3>
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
                <h3> Contact </h3>
                <div className="row">
                    <div className="col-md-2">
                        <label htmlFor="app-email-select">Email</label>
                    </div>
                    <div className="col-md-4">
                        <input
                            className="app-email-select w-100 form-control"
                            name="notificationEmail"
                            value={this.state.notificationEmail}
                            onChange={this.onInputTextChange}
                            placeholder="Email address to get notified from ICISTS"
                            type="text"/>
                    </div>
                    <div className="col-md-6">
                      <p className="text-center">
                        <div className="app-contact-email-info">
                          We will send you information email via this address.
                        </div>
                      </p>
                    </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="app-contact-email-invalid-email">
                      {this.validateEmail(this.state.notificationEmail)
                      ? <div className="app-email-alert alert alert-danger">
                        Please check your email!
                      </div>
                      : <div />}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-2">
                    <label htmlFor="app-phone-number-input">Phone Number</label>
                  </div>
                  <div className="col-md-4">
                    <input
                      className="app-phone-number-input w-100 form-control"
                      name="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.onInputTextChange}
                      placeholder="+821012345678"
                      type="tel"
                    /> 
                  </div>
                  <div className="col-md-6">
                      <p className="text-center">
                        <div className="app-contact-phone-info">
                          Phone Number without '-'
                        </div>
                      </p>
                    </div>
                  <div className="col-md-6" />
                </div>
            </div>
            <hr/>
            <div className="app-as">
              <h3> Terms & Conditions </h3>
              <div className="row">
                <div className="col">
                  <textarea
                    disabled={true}
                    value={provision}
                    className="provision-content form-control"
                    rows={10}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-1">
                  <div className="app-provision">
                    <input
                      name="provisionAgreement"
                      className="app-provision-check form-control"
                      type="checkbox"
                      onChange={this.onInputCheckboxChange}
                      checked={this.state.provisionAgreement}
                    />
                  </div>
                </div>
                <div className="col-md-11">
                  <label className="app-provision-check-label" htmlFor="app-provision-check">
                    <b>(REQUIRED) Check if you agree with the Terms & Conditions</b>
                  </label>    
                </div>
              </div>
              <hr/>
              <div>
                <h3>Please check the entries that applies to you.</h3>
                <div className="row">
                  <div className="col-md-1">
                    <div className="app-dorm-use-check">
                      <input
                        name="dormUse"
                        className="app-dorm-use-check form-control"
                        type="checkbox"
                        onChange={this.onInputCheckboxChange}
                        checked={this.state.dormUse}
                      />
                    </div>
                  </div>
                  <div className="col-md-11">
                    <label className="app-financial-aid-check-label" htmlFor="app-provision-check">
                      Check if you are applying for using dormitory at KAIST during the conference<br /> 
                      (You will have to pay extra accommodation fee if you apply dormitory stay at KAIST.)
                    </label>
                  </div>
                </div>
                <hr />
                <div className="row">  
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
                  <div className="col-md-11">
                    <label className="app-prev-participation-check" htmlFor="app-prev-participation-check">
                      Check if you have participated ICISTS before
                    </label>
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-1">
                    <div className="app-visa">
                      <input
                        name="visaSupport"
                        className="app-visa-check form-control"
                        type="checkbox"
                        onChange={this.onInputCheckboxChange}
                        checked={this.state.visaSupport}
                      />
                    </div>
                  </div>
                  <div className="col-md-11">
                    <label className="app-visa-check-label" htmlFor="app-visa-check">
                      Check if you need a visa supporting letter to enter South Korea
                    </label>
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-1">
                    <div className="app-financial-aid">
                      <input
                        name="financialAid"
                        className="app-financial-aid-check form-control"
                        type="checkbox"
                        onChange={this.onInputCheckboxChange}
                        checked={this.state.financialAid}
                      />
                    </div>
                  </div>
                  <div className="col-md-11">
                    <label className="app-financial-aid-check-label" htmlFor="app-provision-check">
                      Check if you are applying for financial aid
                    </label>
                  </div>
                </div>
                    {this.state.financialAid
                      ?
                      <div className="financial-aid-essay">
                        <p>
                          ICISTS encourages participation of those who currently do not reside in, or are non-permanent residents of the Republic of Korea. Applicants for the Financial Aid Program will be evaluated and the selected applicants will be provided with a grant of 150 USD - 400 USD. 
                        </p>
                        <p>
                          Please write a brief essay to show the reason why you are applying for a financial aid.
                        </p>
                        <textarea
                          name="financialAidEssay"
                          className="app-as-finanical-aid-essay form-control"
                          value={this.state.financialAidEssay}
                          onChange={this.onTextAreaFiEssayChange}
                          placeholder="Your essay for financial aid here"
                          rows={5}
                        />
                      </div>
                      : <div />}
              </div>
            </div>
            <hr/>
            <div className="app-payment">
              <h3> Payment </h3>
              <div className="row">
                <div className="col">
                  <p>The invoice for the participation fee will be sent after the application is reviewed.</p>
                  <p>If you have any concern about payment, please contact us.</p>
                  <hr />
                  <h5>Payment Status</h5>
                  <p>Your payment is {this.state.paymentCheck ? "" : "not"} verified {this.state.paymentCheck ? "" : "yet"}.</p>
                </div>
              </div>
            </div>
            <hr />
            <div className="app-essay">
                <h3> Essay </h3>
                <div className="row">
                  <div className="col">
                    <div className="">
                      <p>{essayProposition}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                      <h5
                        className="essay-topic=1"
                      > {essayTopic1}
                      </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <textarea
                      disabled={true}
                      className="essay-content-1 form-control"
                      rows={3}
                      value={essayContent1_1}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <textarea
                      disabled={true}
                      className="essay-content-1 form-control"
                      rows={5}
                      value={essayContent1_2}
                    />
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col">
                      <h5> {essayTopic2} </h5>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <textarea
                      disabled={true}
                      className="essay-content-2 form-control"
                      rows={2}
                      value={essayContent2_1}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <textarea
                      disabled={true}
                      className="essay-content-1 form-control"
                      rows={4}
                      value={essayContent2_2}
                    />
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-12">
                    <div className="custom-control custom-radio custom-control-inline">
                      <input type="radio" className="custom-control-input" id="essay1_1" name="groupOfRadios" onChange={this.onRadioChange} checked={this.state.essayTopic==='essay1_1'}/>
                      <label className="custom-control-label" htmlFor="essay1_1">Essay Topic 1-1</label>
                    </div>

                    <div className="custom-control custom-radio custom-control-inline">
                      <input type="radio" className="custom-control-input" id="essay1_2" name="groupOfRadios" onChange={this.onRadioChange} checked={this.state.essayTopic==='essay1_2'}/>
                      <label className="custom-control-label" htmlFor="essay1_2">Essay Topic 1-2</label>
                    </div>

                    <div className="custom-control custom-radio custom-control-inline">
                      <input type="radio" className="custom-control-input" id="essay2_1" name="groupOfRadios" onChange={this.onRadioChange} checked={this.state.essayTopic==='essay2_1'}/>
                      <label className="custom-control-label" htmlFor="essay2_1">Essay Topic 2-1</label>
                    </div>

                    <div className="custom-control custom-radio custom-control-inline">
                      <input type="radio" className="custom-control-input" id="essay2_2" name="groupOfRadios" onChange={this.onRadioChange} checked={this.state.essayTopic==='essay2_2'}/>
                      <label className="custom-control-label" htmlFor="essay2_2">Essay Topic 2-2</label>
                    </div>
                  </div>
                </div>
                <hr/>
                <div className="row">
                  <div className="col-md-12">
                    <textarea
                      className="app-essay-input form-control"
                      rows={10}
                      name="essay"
                      onChange={this.onTextAreaEssayChange}
                      value={this.state.essay}
                      placeholder="Your essay here"
                    />
                  </div>
                </div>
                <div className="app-essay-word-count">
                  <div className="row">
                    <div className="col-md-2">
                        Word Count: {this.state.essayWordCount}
                    </div>
                    <div className="col-md-7"/>
                    <div className="col-md-3">
                      {this.state.essayWordCount < this.essayMinWordCount ?
                        <div>Please write around 300 words. </div>
                      : <div />
                      }
                    </div>
                  </div>
                </div>
            </div>
            <hr/>
            <div className="app-channel">
              <div className="row">
                <div className="col">
                  <h3>Survey</h3>
                </div>
              </div>
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
                      value={this.state.channel}
                    >
                      <option disabled={true} selected={true}>
                        I've heard about ICISTS from...
                      </option>
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
                {this.state.lastUpdate.length !== 0 
                  ? <div className="row">
                      <div className="app-notice">
                        <div className="app-alert row alert alert-success">
                          <div className="col-md-14">
                            <p className="text-center">
                              Your applicatoin is saved properly.
                            </p>
                            <p className="text-center">
                              Early Application ends after {timeRemained()}. Your application will be submitted automatically.
                            </p>
                            <p className="text-center">
                              We will send you email about the conference. Stay tuned with your inbox!
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  : <div/>}
              <div className="row">
                <div className="app-save">
                  <div className="app-alert row alert alert-primary">
                    <div className="col-md-14">
                          {this.state.lastUpdate === undefined || this.state.lastUpdate === ""
                          ? <p className="text-center">
                              Your application is not saved yet!
                            </p>
                          : <p className="text=center">
                              Your application is saved at {this.state.lastUpdate}
                            </p>
                          }
                        <button type="submit" className="btn btn-primary w-100">
                          Save
                        </button>
                    </div>
                  </div>
                </div>
              </div>
              </form>
              </div>
          </div>
        </div>
        <div className="col-lg-2"></div>
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