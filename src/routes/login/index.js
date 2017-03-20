/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Layout from '../../components/Layout';
import Login from './Login';

const title = 'Login / Register';

export default {

  path: '/login',

  action({ query }) {
    let error = '';
    switch (query.error) {
      case 'wrong password':
        error = 'You have entered an incorrect password. Please try again.';
        break;
      default:
        error = '';
    }
    return {
      title,
      component: <Layout><Login title={title} error={error} /></Layout>,
    };
  },

};
