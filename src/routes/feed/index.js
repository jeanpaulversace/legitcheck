import React from 'react';
import Layout from '../../components/Layout';
import FeedContainer from '../../containers/FeedContainer';

const title = 'LegitCheck - Check Your Item';

export default {

  path: '/',

  action() {
    return {
      title,
      component: <Layout><FeedContainer /></Layout>,
    };
  },

};
