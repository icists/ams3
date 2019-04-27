import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from "semantic-ui-react";

import SignOutButton from "../SignOut"
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationForAuth /> : <NavigationForNonAuth /> }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationForAuth = () => (
  <div>
    <Menu>
      <Menu.Item>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={ROUTES.HOME}>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={ROUTES.APPLICATION}>Application</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </Menu.Item>
      <Menu.Item>
        <SignOutButton />
      </Menu.Item>
    </Menu>
  </div>
);

const NavigationForNonAuth = () => (
  <div>
    <Menu>
      <Menu.Item>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </Menu.Item>
    </Menu>
  </div>
)
export default Navigation;