/* eslint-disable import/prefer-default-export */

import {
  POST_AWS_REQUEST,
  POST_AWS_ON_PROGRESS,
  POST_AWS_SUCCESS,
  POST_AWS_FAILURE,
} from '../../../constants';

export default (state = {
  isPosting: false,
  progress: 0,
  imageURLs: [],
  error: '',
}, action) => {
  switch (action.type) {
    case POST_AWS_REQUEST:
      return {
        ...state,
        progress: action.payload.progress,
        isPosting: action.payload.isPosting,
      };
    case POST_AWS_ON_PROGRESS:
      return {
        ...state,
        progress: action.payload.progress,
      };
    case POST_AWS_FAILURE:
      return {
        ...state,
        isPosting: action.payload.isPosting,
        error: action.payload.error,
      };
    case POST_AWS_SUCCESS:
      return {
        ...state,
        isPosting: action.payload.isPosting,
        imageURLs: action.payload.imageURLs,
      };
    default:
      return state;
  }
};
