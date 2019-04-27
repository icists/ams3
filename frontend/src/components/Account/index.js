import React from 'react';


import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext, withEmailVerification } from '../Session';
import { compose } from 'recompose';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>
                    Account
                </h1>
                <h3>
                    Account: { authUser.email }
                </h3>
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => authUser != null;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AccountPage);