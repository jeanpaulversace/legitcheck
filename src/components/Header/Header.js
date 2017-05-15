/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';
import logo from './logo.png';

import {
  Navbar,
} from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <Navbar className={s.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className={s.brand} to="/"><img src={logo} width="200" height="25" alt="React" /></Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navigation />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withStyles(s)(Header);
