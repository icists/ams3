import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div className="sign-in">
    <div className="row">
      <div className="col-lg-2"></div>
      <div className="col-lg-8 align-self-center">
      <div className="sign-in-head text-uppercase">
      <h1>Sign In</h1>
      </div>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
      </div>
      <div className="col-lg-2"></div>
    </div>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="sign-in-form">
      <form onSubmit={this.onSubmit}>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="tbox col-md-4">
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div className="col-md-4"></div>

      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="tbox col-md-4">
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </div>
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <button disabled={isInvalid} class="sign-in-btn btn btn-primary" type="submit">
          Sign In
        </button>
        </div>
      </div>
      {error && 
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 sign-in-alert">
        <div class="alert alert-danger" role="alert">
          {error.message}
        </div>
        <div className="col-md-3"></div>
        </div>
        </div>}
      </form>
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };