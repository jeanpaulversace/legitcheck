/* eslint-disable import/prefer-default-export */

import {
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

export default (state = {
  id: '',
  imageURLs: [],
  link: '',
  user: {},
  comments: [],
  checks: [],
  tags: [],
}, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
    case REMOVE_COMMENT_FAILURE:
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.map(comment => comment.content === action.payload.comment.content ?
          { ...action.payload.comment, isPosting: action.payload.isPosting } : comment,
        ),
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        comments: state.comments.filter(comment => (comment.content != action.payload.comment.content && comment.user.id != action.payload.comment.user.id)),
      };
    case REMOVE_COMMENT_REQUEST:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id != action.payload.commentId),
      };
    case ADD_CHECK_REQUEST:
    case REMOVE_CHECK_FAILURE:
      return {
        ...state,
        checks: [...state.checks, action.payload.check],
      };
    case ADD_CHECK_SUCCESS:
      return {
        ...state,
        checks: state.checks.map(check => check.user.id === action.payload.check.user.id ?
          { ...action.payload.check, isPosting: action.payload.isPosting } : check,
        ),
      };
    case ADD_CHECK_FAILURE:
      return {
        ...state,
        checks: state.checks.filter(check => check.user.id !== action.payload.check.user.id),
      };
    case REMOVE_CHECK_REQUEST:
      return {
        ...state,
        checks: state.checks.filter(check => check.id !== action.payload.checkId),
      };
    case UPDATE_CHECK_REQUEST:
      return {
        ...state,
        checks: state.checks.map(check => check.id === action.payload.checkId ?
          { ...check, vote: action.payload.vote } : check,
        ),
      };
    case UPDATE_CHECK_FAILURE:
      return {
        ...state,
        checks: state.checks.map(check => check.id === action.payload.check.id ?
          { ...check, vote: action.payload.check.vote } : check,
        ),
      };
    case UPDATE_CHECK_SUCCESS:
    case REMOVE_CHECK_SUCCESS:
    case REMOVE_COMMENT_SUCCESS:
    default:
      return state;
  }
};
