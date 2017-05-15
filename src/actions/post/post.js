/* eslint-disable import/prefer-default-export */

import {
  RESET_POST,
  ADD_FILES,
  REMOVE_FILE,
  SET_TAGS,
  SET_LINK,
} from '../../constants';

import postAWS from './aws';
import postGraphql from './graphql';
import history from '../../core/history';

export const addFiles = (files) => ({
  type: ADD_FILES,
  payload: {
    files,
  },
});

export const removeFile = (index) => ({
  type: REMOVE_FILE,
  payload: {
    index,
  },
});

export const setTags = (tags) => ({
  type: SET_TAGS,
  payload: {
    tags,
  },
});

export const setLink = (link) => ({
  type: SET_LINK,
  payload: {
    link,
  },
});

export const uploadAWSImagesAndCreatePost = () => (dispatch, getState) => dispatch(postAWS(dispatch, getState)).then(() => dispatch(postGraphql(dispatch, getState)));

export const handleAfterPost = () => (dispatch, getState) => {
  const post = getState().post;

  if (!post.request.aws.error && !post.request.graphql.error) {
    setTimeout(() => {
      history.push('/');

      dispatch({
        type: RESET_POST,
      });
    }, 3000);
  }
};
