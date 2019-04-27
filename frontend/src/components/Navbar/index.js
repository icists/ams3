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
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
      <img src={logo} height="30" alt="icists logo"/>
      </NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
          <AuthUserContext.Consumer>
            {authUser =>
              authUser ? <NavigationForAuth /> : <NavigationForNonAuth /> }
          </AuthUserContext.Consumer>
      </Collapse>
    </Navbar>
    )
  }
}

const NavigationForAuth = () => (
  <div>
    <Nav className="ml-auto" navbar>
        <NavItem>
            <Link className="nav-link" to={ROUTES.HOME}>Home</Link>
        </NavItem>
        {/* <NavItem>
            <Link className="nav-link" to={ROUTES.DASHBOARD}>Dashboard</Link>
        </NavItem> */}
        <NavItem>
            <Link className="nav-link" to={ROUTES.APPLICATION}>Application</Link>
        </NavItem>
        <NavItem>
            <Link className="nav-link" to={ROUTES.ACCOUNT}>Account</Link>
        </NavItem>
        <NavItem>
            <SignOutButton />
        </NavItem>

        {/* <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
            Options
            </DropdownToggle>
            <DropdownMenu right>
            <DropdownItem>
                Option 1
            </DropdownItem>
            <DropdownItem>
                Option 2
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
                Reset
            </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown> */}
        </Nav>
  </div>
);

const NavigationForNonAuth = () => (
    <div style={{float:'right'}}>
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
        {/* <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              Option 1
            </DropdownItem>
            <DropdownItem>
              Option 2
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              Reset
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
        </Nav>
  
    </div>
)

export default Navigation;