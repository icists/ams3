import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <div>
        <h5>
          Reset Password
        </h5>
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col md-5 w-90">
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="New Password"
              />
            </div>
            <div className="col md-5 w-90">
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm New Password"
              />
            </div>
            <div className="col md-2">
              <button disabled={isInvalid} type="submit">
                Reset My Password
              </button>
            </div>
          </div>
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);