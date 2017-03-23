/* eslint-disable import/prefer-default-export */

import {
  ADD_FILES,
  REMOVE_FILE,
  SET_TAGS,
  SET_LINK,
  POST_AWS_REQUEST,
  POST_AWS_ON_PROGRESS,
  POST_AWS_SUCCESS,
  POST_AWS_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
} from '../constants';

export default function post(state = {
  files: [],
  tags: [],
  link: '',
  // isPosting = false,
}, action) {
  switch (action.type) {
    case ADD_FILES:
      return {
        ...state,
        files: state.files.concat(action.files),
      };
    case REMOVE_FILE:
      var files = state.files;
      files.splice(action.index, 1);
      return {
        ...state,
        files,
      };
    case SET_TAGS:
      return {
        ...state,
        tags: action.tags,
      };
    case SET_LINK:
      return {
        ...state,
        link: action.link,
      };
    default:
      return state;
  }
}
