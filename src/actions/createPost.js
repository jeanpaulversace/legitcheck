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

export const addFiles = (files) => {
  return {
    type: ADD_FILES,
    files,
  };
};

export const removeFile = (file) => {
  return {
    type: REMOVE_FILE,
    file,
  };
};

export const setTags = (tags) => {
  return {
    type: SET_TAGS,
    tags,
  };
};

export const setLink = (link) => {
  return {
    type: SET_LINK,
    link,
  };
};
