import React from 'react';
import Layout from '../../components/Layout';
import Post from './Post';

const title = 'Check Your Item';

export default {

  path: '/post',

  action() {
    return {
      title,
      component: <Layout><Post title={title} /></Layout>,
    };
  },

};
