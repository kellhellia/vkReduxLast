import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducers';
import tracks from './tracksReducers';
import search from './searchReducers';
import newPlaylist from './newPlaylistReducers';
import playlists from './playlistsReducers';
import currentPlaylist from './currentPlaylistReducers';

export default combineReducers({
    user,
    tracks,
    search,
    playlists,
    newPlaylist,
    currentPlaylist,
    routing: routerReducer
});