/* eslint-disable import/prefer-default-export */

import {
  BEGIN_POST,
  END_POST,
  POST_AWS_REQUEST,
  POST_AWS_ON_PROGRESS,
  POST_AWS_SUCCESS,
  POST_AWS_FAILURE,
  POST_GRAPHQL_REQUEST,
  POST_GRAPHQL_SUCCESS,
  POST_GRAPHQL_FAILURE,
} from '../../../constants';

import aws from './aws';
import graphql from './graphql';

export default (state = {
  isPosting: false,
  status: '',
  success: false,
  aws: {},
  graphql: {},
}, action) => {
  switch (action.type) {
    case BEGIN_POST:
      return {
        ...state,
        isPosting: true,
      };
    case END_POST:
      return {
        ...state,
        isPosting: false,
      };
    case POST_AWS_REQUEST:
    case POST_AWS_ON_PROGRESS:
    case POST_AWS_SUCCESS:
      return {
        ...state,
        status: action.payload.status,
        aws: aws(state.aws, action),
      };
    case POST_AWS_FAILURE:
      return {
        ...state,
        success: action.payload.success,
        status: action.payload.status,
        aws: aws(state.aws, action),
      };
    case POST_GRAPHQL_REQUEST:
      return {
        ...state,
        status: action.payload.status,
        graphql: graphql(state.graphql, action),
      };
    case POST_GRAPHQL_SUCCESS:
    case POST_GRAPHQL_FAILURE:
      return {
        ...state,
        success: action.payload.success,
        status: action.payload.status,
        graphql: graphql(state.graphql, action),
      };
    default:
      return state;
  }
};
