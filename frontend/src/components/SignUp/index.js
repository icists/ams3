import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const SignUpPage = () => {
    return (
        <div className="container sign-up">
            <div className="row">
            <div className="col-sm-12 align-self-center">
                <div className="sign-up-head text-uppercase">
                <h1>Sign Up</h1>
                </div>
                <SignUpForm/>
            </div>
            </div>
        </div>
    );
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    verificationSent: false,
    error: null,
  };

class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne } = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase
                .user(authUser.user.uid)
                .set({
                    username,
                    email,
                });
            })
            .then(() => {
                this.setState({
                    verificationSent: true,
                })
                return this.props.firebase.doSendEmailVerification();
            })
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error !== undefined) {
                    alert(error.message);
                }
                this.setState({ error });
            });
        
        event.preventDefault();
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div className="sign-up-form">
            <form onSubmit={this.onSubmit}>
            <div className="row">
            <div className="col-md-4"></div>
            <div className="tbox col-md-4">
            <input
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="User Name"
                />
            </div>
            <div className="col-md-4"></div>
            </div>
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
                <div className="col-md-4 tbox">
                <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                />
                </div>
                <div className="col-md-4"></div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 tbox">
                <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
                />
                </div>
                <div className="col-md-4"></div>
            </div>
            <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4">
                <button disabled={isInvalid} class="sign-up-btn btn btn-primary" type="submit">Sign Up</button>
                </div>
                <div className="col-md-4"></div>
            </div>
                    {this.state.verificationSent
                        ?   <div className="alert alert-success">
                            Verification Email is sent! Please check your email and verify your account.
                            </div>
                        : <div></div>}
            {error && 
                <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 sign-up-alert">
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

const SignUpLink = () => {
    return (
        <div className="row text-center">
        <div className="col">
        <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP} class="sign-up-link">Sign Up</Link>
        </p>
        </div>
        </div>
    );
}

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink }