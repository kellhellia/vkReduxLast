import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './usersReducers';
import tracks from './tracksReducers';
import userSearch from './userSearchReducers';


export default combineReducers({
    user,
    tracks,
    userSearch,
    routing: routerReducer
});