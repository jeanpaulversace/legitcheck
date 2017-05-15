/* eslint-disable import/prefer-default-export */

import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
  ADD_CHECK_REQUEST,
  ADD_CHECK_SUCCESS,
  ADD_CHECK_FAILURE,
  REMOVE_CHECK_REQUEST,
  REMOVE_CHECK_SUCCESS,
  REMOVE_CHECK_FAILURE,
  UPDATE_CHECK_REQUEST,
  UPDATE_CHECK_SUCCESS,
  UPDATE_CHECK_FAILURE,
} from '../../constants';

import legitcheck from './legitcheck';

export default (state = {
  posts: [],
  isRequesting: false,
  error: '',
}, action) => {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return {
        ...state,
        isRequesting: action.payload.isRequesting,
      };
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        isRequesting: action.payload.isRequesting,
        posts: action.payload.posts,
      };
    case FETCH_FEED_FAILURE:
      return {
        ...state,
        isRequesting: action.payload.isRequesting,
        error: action.payload.error,
      };
    case ADD_COMMENT_REQUEST:
    case ADD_COMMENT_SUCCESS:
    case ADD_COMMENT_FAILURE:
    case REMOVE_COMMENT_REQUEST:
    case REMOVE_COMMENT_SUCCESS:
    case REMOVE_COMMENT_FAILURE:
    case ADD_CHECK_REQUEST:
    case ADD_CHECK_SUCCESS:
    case ADD_CHECK_FAILURE:
    case REMOVE_CHECK_REQUEST:
    case REMOVE_CHECK_SUCCESS:
    case REMOVE_CHECK_FAILURE:
    case UPDATE_CHECK_REQUEST:
    case UPDATE_CHECK_SUCCESS:
    case UPDATE_CHECK_FAILURE:
      return {
        ...state,
        posts: state.posts.map(post => post.id === action.payload.postId ?
        legitcheck(post, action) : post),
      };
    default:
      return state;
  }
};
