import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from "../SignOut"
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

import logo from '../../assets/img/logo.png'

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return(
      <div className="main-navbar">
    <Navbar light className="navbar-expand-lg" expand="md">
      <Link to={ROUTES.HOME} className="navbar-brand">
      <img src={logo} alt="icists logo"/>
      </Link>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationForAuth /> : <NavigationForNonAuth /> }
          </AuthUserContext.Consumer>
      </Collapse>
    </Navbar>
      </div>

    )
  }
}

const NavigationForAuth = () => (
  <div className="navbar">
    <Nav className="ml-auto" navbar>
        <NavItem>
            <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
        </NavItem>
        <NavItem>
            <Link className="nav-link" to={ROUTES.APPLICATION}>Application</Link>
        </NavItem>
        <NavItem>
            <Link className="nav-link" to={ROUTES.ACCOUNT}>Account</Link>
        </NavItem>
        <NavItem>
            <SignOutButton />
        </NavItem>
      </Nav>
  </div>
);

const NavigationForNonAuth = () => (
    <div className="navbar">
        <Nav className="ml-auto" navbar>
            <NavItem>
                <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
            </NavItem>
            <NavItem>
                <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
            </NavItem>
            <NavItem>
                <Link className="nav-link" to={ROUTES.SIGN_UP}>Sign Up</Link>
            </NavItem>
        </Nav>
    </div>
)

export default Navigation;