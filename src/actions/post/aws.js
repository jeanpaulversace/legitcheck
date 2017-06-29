/* eslint-disable import/prefer-default-export */

import {
  BEGIN_POST,
  POST_AWS_REQUEST,
  POST_AWS_ON_PROGRESS,
  POST_AWS_SUCCESS,
  POST_AWS_FAILURE,
} from '../../constants';

import { getSignedRequest, uploadFile } from '../../core/AWS/AWS';
// import fetchWithProgress from '../../core/fetch/fetchWithProgress';

export default () => async (dispatch, getState) => {
  dispatch({
    type: BEGIN_POST,
    payload: {
      isPosting: true,
    },
  });

  dispatch({
    type: POST_AWS_REQUEST,
    payload: {
      progress: 0,
      status: 'Preparing to upload images...',
      isPosting: true,
    },
  });

  const state = getState();
  const files = state.post.files;

    // format filenames for AWS
  const formattedFileNames = files.map((file) => {
    const fileNameSplit = file.name.replace(/[^\w\d_\-\.]+/ig, '').split('.');
    return `${fileNameSplit.shift() + Date.now().toString()}.${fileNameSplit.shift()}`;
  });

    // create object to store/calculate file upload progress
  const fileNameProgress = {};

    // update progress callback
  function onProgress(url) {
    return (event) => {
      const currentProgress = fileNameProgress[url];
      if (currentProgress.total === 0) currentProgress.total = event.total;
      currentProgress.loaded = event.loaded;
      const progresses = Object.values(fileNameProgress);
      const progress = Math.round(progresses.reduce((prev, curr) => ({ loaded: prev.loaded += curr.loaded }), { loaded: 0 }).loaded / progresses.reduce((prev, curr) => ({ total: prev.total += curr.total }), { total: 0 }).total * 100);
      dispatch({
        type: POST_AWS_ON_PROGRESS,
        payload: {
          status: 'Uploading images...',
          progress,
        },
      });
    };
  }

  const imageUploadPromises = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    imageUploadPromises.push(getSignedRequest(formattedFileNames[i], file).then((response) => {
      fileNameProgress[response.url] = {
        loaded: 0,
        total: 0,
      };
      return uploadFile(file, response.signedRequest, onProgress(response.url));
    }));
  }

  return Promise.all(imageUploadPromises).then(() => {
    dispatch({
      type: POST_AWS_SUCCESS,
      payload: {
        status: 'Image upload complete...',
        imageURLs: Object.keys(fileNameProgress),
      },
    });
  }).catch((error) => {
    dispatch({
      type: POST_AWS_FAILURE,
      payload: {
        status: `Image upload failed with error: ${error}`,
        success: false,
        isPosting: false,
        error,
      },
    });
  });
};
