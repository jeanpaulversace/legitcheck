import { connect } from 'react-redux';

import { getFeed } from '../actions/feed';

import {
  addCheck,
  removeCheck,
  updateCheck,
} from '../actions/check';

import {
  addComment,
  removeComment,
} from '../actions/comment';

import Feed from '../components/Feed';

const mapStateToProps = (state) => {
  const user = state.user;
  const feed = state.feed;
  return {
    posts: feed.posts,
    isRequesting: feed.isRequesting,
    error: feed.error,
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getFeed: () => {
    dispatch(getFeed());
  },
  addCheck: (params) => {
    dispatch(addCheck(params));
  },
  removeCheck: (params) => {
    dispatch(removeCheck(params));
  },
  updateCheck: (params) => {
    dispatch(updateCheck(params));
  },
  addComment: (params) => {
    dispatch(addComment(params));
  },
  removeComment: (params) => {
    dispatch(removeComment(params));
  },
});

const FeedContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);

export default FeedContainer;
