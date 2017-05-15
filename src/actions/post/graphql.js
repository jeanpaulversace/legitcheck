/* eslint-disable import/prefer-default-export */

import {
  POST_GRAPHQL_REQUEST,
  POST_GRAPHQL_SUCCESS,
  POST_GRAPHQL_FAILURE,
} from '../../constants';

import fetch from '../../core/fetch';

export default () => async (dispatch, getStore) => {
  const store = getStore();
  dispatch({
    type: POST_GRAPHQL_REQUEST,
    payload: {
      status: 'Posting the Legit Check...',
      isPosting: true,
    },
  });

  const post = {
    userId: store.user.id,
    imageURLs: store.post.request.aws.imageURLs,
    tags: store.post.tags,
    link: store.post.link,
  };

  const query = `mutation CreatePost($post: PostInput) {
      createPost(post: $post) {
        user {
          id
        },
        tags {
          id
        },
        imageURLs,
        link
      }
    }`;

  try {
    const resp = await fetch('/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          post,
        },
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data) {
      throw 'Error occured during post creation!';
    } else {
      dispatch({
        type: POST_GRAPHQL_SUCCESS,
        payload: {
          success: true,
          status: 'Post created successfully!',
          isPosting: false,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: POST_GRAPHQL_FAILURE,
      payload: {
        success: false,
        status: `Error occured during post creation: ${error}`,
        isPosting: false,
        error,
      },
    });
  }
};
