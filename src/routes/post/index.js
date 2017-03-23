import React from 'react';
import Layout from '../../components/Layout';
import PostContainer from '../../containers/PostContainer';

const title = 'Check Your Item';

export default {

  path: '/post',

  action() {
    return {
      title,
      component: <Layout><PostContainer /></Layout>,
    };
  },

};
