/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

import {
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    const LoggedInNavigation = () => (
      <Nav pullRight>
        <NavItem componentClass={Link} to="/post"><FontAwesome style={{ color: 'black' }} name="plus" /></NavItem>
        <NavItem componentClass={Link} to="/activity"><FontAwesome style={{ color: 'black' }} name="bell" /></NavItem>
        <NavItem componentClass={Link} eventKey={1} href="/login" to="/login"><FontAwesome style={{ color: 'black' }} name="user" /></NavItem>
      </Nav>
    );

    const LoggedOutNavigation = () => (
      <Nav pullRight>
        <NavItem componentClass={Link} to="/about">About</NavItem>
        <NavItem componentClass={Link} to="/contact">Contact</NavItem>
        <NavItem componentClass={Link} href="/login" to="/login">Login / Register</NavItem>
      </Nav>
    );

    // { this.context.user ? <LoggedInNavigation /> : <LoggedOutNavigation /> }
    return (
      <div>
        <LoggedOutNavigation />
      </div>
    );
  }
}

export default withStyles(s)(Navigation);
