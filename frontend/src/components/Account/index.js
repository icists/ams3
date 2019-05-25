import React from 'react';

import PasswordChangeForm from '../PasswordChange';
import { withAuthorization, AuthUserContext, withEmailVerification } from '../Session';
import { compose } from 'recompose';

const AccountPage = () => (
    <div id="account" className="row">
        <div className="col-lg-2"></div>
        <div className="col-lg-8">
        <AuthUserContext.Consumer>
            {authUser => (
                <div className="account">
                    <h1>
                        Account
                    </h1>
                    <div className="alert alert-info account-alert">
                    <h3>
                        Account Email : { authUser.email }
                    </h3>
                    </div>

                    <PasswordChangeForm />
                </div>
            )}
        </AuthUserContext.Consumer>
        </div>
        <div className="col-lg-2"></div>
    </div>
);

const condition = authUser => authUser != null;

export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(AccountPage);