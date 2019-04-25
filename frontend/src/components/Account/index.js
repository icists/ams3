import React from 'react';

import { Header } from "semantic-ui-react";

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <Header as="h1">
                    Account Page
                </Header>
                <Header as="h2">
                    Account: { authUser.email }
                </Header>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => authUser != null;

export default withAuthorization(condition)(AccountPage);