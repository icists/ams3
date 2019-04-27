import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from "../Navbar";
import Home from '../Home';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import Dashboard from '../Dashboard';
import AccountPage from '../Account';
import ApplicationPage from "../Application";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session"

const App = () => (
        <BrowserRouter>
            <div className="container">
                <Navbar />
                <Switch>
                <Route exact path={ROUTES.HOME} component={Home} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                <Route path={ROUTES.APPLICATION} component={ApplicationPage} />
                <Route path={ROUTES.DASHBOARD} component={Dashboard} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                </Switch>
            </div>
        </BrowserRouter>
)

export default withAuthentication(App);