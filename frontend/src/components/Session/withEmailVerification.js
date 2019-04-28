import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withEmailVerification = Component => {
    class WithEmailVerification extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                isSent: false,
            }
        }
        onSendEmailVerification = () => {
            this.props.firebase
                .doSendEmailVerification()
                .then(() => this.setState({
                    isSent: true,
                }));
        }
        render() {
        return (
            <AuthUserContext.Consumer>
                {authUser =>
                    needsEmailVerification(authUser) ? (
                        <div className="email-verify alert alert-info">
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                {this.state.isSent ? (
                                <p>
                                E-Mail confirmation sent: Check you E-Mails (Spam
                                folder included) for a confirmation E-Mail.
                                Refresh this page once you confirmed your E-Mail.
                                </p>
                                ) : (
                                    <p>
                                    Verify your E-Mail: Check you E-Mails (Spam folder
                                    included) for a confirmation E-Mail or send
                                    another confirmation E-Mail.
                                    </p>
                                )}
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                            <div className="row">
                                <div className="col-md-3"></div>
                                <div className="col-md-6">
                                <button
                                type="button"
                                className="email-verify-btn btn btn-primary text-uppercase"
                                onClick={this.onSendEmailVerification}
                                disabled={this.state.isSent} >
                                Send confirmation E-Mail
                                </button>
                                </div>
                                <div className="col-md-3"></div>
                            </div>
                        </div>
                    ) : (
                <Component {...this.props} />
                )}
            </AuthUserContext.Consumer>
        );
        }
    }

    return withFirebase(WithEmailVerification);
    };

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified &&
  authUser.providerData
    .map(provider => provider.providerId)
    .includes('password');

export default withEmailVerification;