import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const PasswordForgetPage = () => (
  <div className="password-forget">
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <div>
      <form onSubmit={this.onSubmit}>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4 tbox">
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div className="col-md-4"></div>
      </div>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
        <button disabled={isInvalid} className="password-forget-btn btn btn-primary" type="submit">
          Reset My Password
        </button>
        </div>
        <div className="col-md-4"></div>
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
    <Link to={ROUTES.PASSWORD_FORGET} class="forget-password-link">Forgot Password?</Link>
  </div>
  </div>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };