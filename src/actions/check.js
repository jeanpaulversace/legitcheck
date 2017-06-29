/* eslint-disable import/prefer-default-export */

import {
  ADD_CHECK_REQUEST,
  ADD_CHECK_SUCCESS,
  ADD_CHECK_FAILURE,
  REMOVE_CHECK_REQUEST,
  REMOVE_CHECK_SUCCESS,
  REMOVE_CHECK_FAILURE,
  UPDATE_CHECK_REQUEST,
  UPDATE_CHECK_SUCCESS,
  UPDATE_CHECK_FAILURE,
} from '../constants';

export const addCheck = (params) => async (dispatch, getStore) => {
  const { postId, vote } = params;

  const store = getStore();
  const check = {
    userId: store.user.id,
    postId,
    vote,
  };

  dispatch({
    type: ADD_CHECK_REQUEST,
    payload: {
      postId,
      check: {
        vote,
        id: 'temporary',
        user: store.user,
        isPosting: true,
      },
    },
  });

  const query = `mutation AddCheck($check: CheckInput) {
      addCheck(check: $check) {
        id,
        user {
          id,
          email
        },
        vote,
      },
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
          check,
        },
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.addCheck) {
      throw 'Error occured posting check!';
    } else {
      dispatch({
        type: ADD_CHECK_SUCCESS,
        payload: {
          postId,
          isPosting: false,
          check: data.addCheck,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: ADD_CHECK_FAILURE,
      payload: {
        postId,
        isPosting: false,
        check,
        error,
      },
    });
  }
};

export const removeCheck = (params) => async (dispatch, getStore) => {
  const { checkId, postId, vote } = params;

  const store = getStore();
  const check = {
    id: checkId,
    user: store.user,
    vote,
  };

  dispatch({
    type: REMOVE_CHECK_REQUEST,
    payload: {
      postId,
      checkId,
    },
  });

  const query = `mutation RemoveCheck($checkId: String!) {
      removeCheck(checkId: $checkId) {
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
          checkId,
        },
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.removeCheck) {
      throw 'Error occured removing check!';
    } else {
      dispatch({
        type: REMOVE_CHECK_SUCCESS,
        payload: {
          postId,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: REMOVE_CHECK_FAILURE,
      payload: {
        postId,
        check,
        error,
      },
    });
  }
};

export const updateCheck = (params) => async (dispatch, getStore) => {
  const { checkId, postId, vote, oldVote } = params;

  const store = getStore();

  dispatch({
    type: UPDATE_CHECK_REQUEST,
    payload: {
      postId,
      checkId,
      vote,
    },
  });

  const query = `mutation UpdateCheck($check: CheckUpdateInput) {
      updateCheck(check: $check) {
        id,
        user {
          id,
          email
        },
        vote,
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
          check: {
            checkId,
            vote,
          },
        },
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.updateCheck) {
      throw 'Error occured updating check!';
    } else {
      dispatch({
        type: UPDATE_CHECK_SUCCESS,
        payload: {
          postId,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_CHECK_FAILURE,
      payload: {
        postId,
        check: {
          id: checkId,
          user: store.user,
          vote: oldVote,
        },
        error,
      },
    });
  }
};
