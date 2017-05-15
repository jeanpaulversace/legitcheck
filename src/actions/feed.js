/* eslint-disable import/prefer-default-export */

import {
  FETCH_FEED_REQUEST,
  FETCH_FEED_SUCCESS,
  FETCH_FEED_FAILURE,
} from '../constants';

export const getFeed = () => async (dispatch) => {
  dispatch({
    type: FETCH_FEED_REQUEST,
    payload: {
      isRequesting: true,
    },
  });

  const query = `{
      feed {
        id,
        imageURLs,
        link,
        user {
          id,
          email,
        },
        comments {
          id,
          content,
          user {
            id,
            email,
          },
        },
        checks {
          id,
          vote,
          user {
            id
          },
        },
        tags {
          name,
        },
      }
    }`;

  try {
    const resp = await fetch('/graphql', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
      credentials: 'include',
    });
    const { data } = await resp.json();
    if (!data || !data.feed) {
      throw 'Error occured getting feed!';
    } else {
      dispatch({
        type: FETCH_FEED_SUCCESS,
        payload: {
          posts: data.feed,
          isRequesting: false,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_FEED_FAILURE,
      payload: {
        isRequesting: false,
        error,
      },
    });
  }
};
