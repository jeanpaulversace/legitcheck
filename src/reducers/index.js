import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import post from './post/post';
import feed from './feed/feed';

export default combineReducers({
  user,
  runtime,
  post,
  feed,
});
