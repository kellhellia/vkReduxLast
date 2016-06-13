import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './usersReducers';
import tracks from './tracksReducers';
import userSearch from './userSearchReducers';
import newPlaylist from './newPlaylistReducers';

export default combineReducers({
    user,
    tracks,
    userSearch,
    newPlaylist,
    routing: routerReducer
});