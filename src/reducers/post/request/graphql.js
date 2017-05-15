/* eslint-disable import/prefer-default-export */

import {
  POST_GRAPHQL_REQUEST,
  POST_GRAPHQL_SUCCESS,
  POST_GRAPHQL_FAILURE,
} from '../../../constants';

export default (state = {
  isPosting: false,
  error: '',
}, action) => {
  switch (action.type) {
    case POST_GRAPHQL_REQUEST:
      return {
        ...state,
        isPosting: action.payload.isPosting,
      };
    case POST_GRAPHQL_SUCCESS:
      return {
        ...state,
        isPosting: action.payload.isPosting,
      };
    case POST_GRAPHQL_FAILURE:
      return {
        ...state,
        isPosting: action.payload.isPosting,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
