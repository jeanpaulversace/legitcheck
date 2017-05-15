/* eslint-disable import/prefer-default-export */

import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_COMMENT_REQUEST,
  REMOVE_COMMENT_SUCCESS,
  REMOVE_COMMENT_FAILURE,
} from '../constants';

export const addComment = (params) => async (dispatch, getStore) => {
  const { postId, content } = params;

  const store = getStore();
  const comment = {
    userId: store.user.id,
    postId,
    content,
  };

  dispatch({
    type: ADD_COMMENT_REQUEST,
    payload: {
      postId,
      comment: {
        content,
        id: 'temporary',
        user: store.user,
        isPosting: true,
      },
    },
  });


  const query = `mutation AddComment($comment: CommentInput) {
      addComment(comment: $comment) {
        id,
        user {
          id,
          email,
        },
        content,
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
          comment,
        },
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.addComment) {
      throw 'Error occured posting comment!';
    } else {
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: {
          postId,
          isPosting: false,
          comment: data.addComment,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAILURE,
      payload: {
        postId,
        isPosting: false,
        comment,
        error,
      },
    });
  }
};

export const removeComment = (params) => async (dispatch, getStore) => {
  const { postId, commentId, content } = params;

  const store = getStore();
  const comment = {
    id: commentId,
    user: store.user,
    content,
  };

  dispatch({
    type: REMOVE_COMMENT_REQUEST,
    payload: {
      postId,
      commentId,
    },
  });


  const query = `mutation RemoveComment($commentId: String!) {
      removeComment(commentId: $commentId) {
        success
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
          commentId,
        },
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.removeComment) {
      throw 'Error occured removing comment!';
    } else {
      dispatch({
        type: REMOVE_COMMENT_SUCCESS,
        payload: {
          postId,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: REMOVE_COMMENT_FAILURE,
      payload: {
        postId,
        comment,
        error,
      },
    });
  }
};
