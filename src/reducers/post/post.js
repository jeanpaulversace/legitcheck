/* eslint-disable import/prefer-default-export */

import {
  BEGIN_POST,
  END_POST,
  RESET_POST,
  ADD_FILES,
  REMOVE_FILE,
  SET_TAGS,
  SET_LINK,
  POST_AWS_REQUEST,
  POST_AWS_ON_PROGRESS,
  POST_AWS_SUCCESS,
  POST_AWS_FAILURE,
  POST_GRAPHQL_REQUEST,
  POST_GRAPHQL_SUCCESS,
  POST_GRAPHQL_FAILURE,
} from '../../constants';

import request from './request/request';

export default (state = {
  files: [],
  tags: [],
  link: '',
  request: {},
}, action) => {
  switch (action.type) {
    case ADD_FILES:
      return {
        ...state,
        files: state.files.concat(action.payload.files),
      };
    case REMOVE_FILE:
      return {
        ...state,
        files: [
          ...state.files.slice(0, action.payload.index),
          ...state.files.slice(action.payload.index + 1),
        ],
      };
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload.tags,
      };
    case SET_LINK:
      return {
        ...state,
        link: action.payload.link,
      };
    case BEGIN_POST:
    case END_POST:
    case POST_AWS_REQUEST:
    case POST_AWS_ON_PROGRESS:
    case POST_AWS_SUCCESS:
    case POST_AWS_FAILURE:
    case POST_GRAPHQL_REQUEST:
    case POST_GRAPHQL_SUCCESS:
    case POST_GRAPHQL_FAILURE:
      return {
        ...state,
        request: request(state.request, action),
      };
    case RESET_POST:
      return {
        files: [],
        tags: [],
        link: '',
        request: {
          isPosting: false,
          status: '',
          success: false,
          aws: {
            isPosting: false,
            progress: 0,
            imageURLs: [],
            error: '',
          },
          graphql: {
            isPosting: false,
            error: '',
          },
        },
      };
    default:
      return state;
  }
};
