import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from "../SignOut"
import * as ROUTES from '../../constants/routes';

const Navigation = () => (
  <div>
    <ul>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      <Link to={ROUTES.LANDING}>Landing</Link>
      <Link to={ROUTES.HOME}>Home</Link>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
      <SignOutButton />
    </ul>
  </div>
);

export default Navigation;