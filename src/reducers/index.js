import { combineReducers } from 'redux';
import user from './usersReducers';
import comments from './commentsReducers';
import tracks from './tracksReducers';

export default combineReducers({ user, tracks, comments });