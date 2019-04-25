import React from 'react';

import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext } from '../Session';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Account Page</h1>
                <h2>
                    Account: { authUser.email }
                </h2>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => authUser != null;

export default withAuthorization(condition)(AccountPage);