import React from "react";
import { Divider } from "semantic-ui-react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Navbar from "../Navbar";
import Home from '../Home';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import Dashboard from '../Dashboard';
import AccountPage from '../Account';

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session"

const App = () => (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/signup' component={SignUpPage} />
                <Route path='/signin' component={SignInPage} />
                <Route path='/passwordforget' component={PasswordForgetPage} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/account' component={AccountPage} />
            </Switch>
        </BrowserRouter>
)

export default withAuthentication(App);