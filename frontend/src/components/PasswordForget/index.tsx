import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div className="password-forget">
    <h1>Did you forget your password?</h1>
    <PasswordForgetForm />
    <h5>Password-reset email will be sent. Check your inbox.</h5>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

interface IPasswordForgetState {
  email: string;
  error: any;

}

class PasswordForgetFormBase extends Component<any, IPasswordForgetState> {
  constructor(props: any) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error: any) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    this.setState((current) => ({
      ...current,
      [target.name]: target.value
    }));
  };

  render() {
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <div>
      <form onSubmit={this.onSubmit}>
      <div className="row">
        <div className="col-md-4"/>
        <div className="col-md-4 tbox">
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div className="col-md-4"/>
      </div>
      <div className="row">
        <div className="col-md-4"/>
        <div className="col-md-4">
        <button disabled={isInvalid} className="password-forget-btn btn btn-primary" type="submit">
          Reset My Password
        </button>
        </div>
        <div className="col-md-4"/>
      </div>
        {error && <p>{error.message}</p>}
      </form>
      </div>
    );
  }
}

const PasswordForgetLink = () => (
  <div className="row text-center">
  <div className="col forget-password">
    <Link to={ROUTES.PASSWORD_FORGET} className="forget-password-link">Forgot Password?</Link>
  </div>
  </div>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };