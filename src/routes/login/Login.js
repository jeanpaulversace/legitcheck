/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';

import {
  Grid,
  Row,
  Col,
  Button,
  PageHeader,
  FormGroup,
  Alert,
} from 'react-bootstrap';

import fetch from '../../core/fetch';


class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    error: PropTypes.string,
  };

  state = {
    email: '',
    password: '',
  };

  handleLogin = async (evt) => {
    evt.preventDefault();

    const email = this.state.email;
    const password = this.state.password;
    await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    this.setState({
      email: '',
      password: '',
      message: '',
    });
  };

  handleEmptySubmit = (evt) => {
    evt.preventDefault();

    this.setState({ message: 'Please enter your email and password' });
  }

  handleEmailChange = (evt) => {
    this.setState({ email: evt.target.value });
  };

  handlePasswordChange = (evt) => {
    this.setState({ password: evt.target.value });
  };

  render() {
    const handleSubmit = (this.state.email && this.state.password) ? this.handleLogin : this.handleEmptySubmit;
    return (
      <Grid>
        <Row>
          <Col sm={4} md={4} />
          <Col sm={4} md={4}>
            <PageHeader>Log In / Register</PageHeader>
            <div className={s.formGroup}>
              <a className={s.facebook} href="/login/facebook">
                <svg
                  className={s.icon}
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 16l1-5h-5V7c0-1.544.784-2 3-2h2V0h-4c-4.072 0-7 2.435-7 7v4H7v5h5v14h6V16h4z"
                  />
                </svg>
                <span>Log in with Facebook</span>
              </a>
            </div>
            <strong className={s.lineThrough}>OR</strong>
            { this.props.error && <Alert bsStyle="danger">{this.props.error}</Alert> }
            { this.state.message && <Alert bsStyle="danger">{this.state.message}</Alert> }
            <FormGroup>
              <form method="post" onSubmit={handleSubmit} >
                <div className={s.formGroup}>
                  <label className={s.label} htmlFor="email">
                        Email address:
                      </label>
                  <input
                    value={this.state.email}
                    className={s.input}
                    id="email"
                    type="text"
                    name="email"
                    autoFocus
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className={s.formGroup}>
                  <label className={s.label} htmlFor="password">
                        Password:
                      </label>
                  <input
                    value={this.state.password}
                    className={s.input}
                    id="password"
                    type="password"
                    name="password"
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <p> By clicking on 'Login / Register', you are agreeing to Legitcheck's User End Agreement and our Terms of Service. </p>
                <div className={s.submit}>
                  <Button bsSize="large" type="submit">
                        Login / Register
                      </Button>
                </div>
              </form>
            </FormGroup>
          </Col>
          <Col sm={4} md={4} />
        </Row>
      </Grid>
    );
  }
}

export default withStyles(s)(Login);
