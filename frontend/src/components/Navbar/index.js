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
  <div>
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
  </div>
    )
  }
}

const NavigationForAuth = () => (
  <div>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink href='/'>Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/dashboard'>Dashboard</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/application'>Application</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href='/account'>Account</NavLink>
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
      <NavLink href='/'>Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href='/signin'>Sign In</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href='/signup'>Sign Up</NavLink>
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