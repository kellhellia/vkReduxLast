import * as types from '../actions';

let initialState = {
    value: {
        firstName: 'firstName',
        lastName: 'lastName',
        id: 1,
        userPic: 'userPic'
    },
    playlists: [],
    fetchStatus: {},
    currentPlaylist: ''
};

// TBD: Need to refactor and divide logic of playlists and user

export default function user(state = initialState, action) {
    switch(action.type) {
        case types.ADD_USER_REQUEST:
            // return state.concat(action.user);
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADING'
                }
            };

        case types.ADD_USER_FAILED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'FAILED',
                    message: action.message
                }
            };

        case types.ADD_USER_LOADED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADED'
                },
                value: action.user
            };

        case types.GET_USER_PLAYLISTS:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADING'
                }
            };

        case types.GET_USER_PLAYLISTS_FAILED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'FAILED',
                    message: action.message
                }
            };

        case types.GET_USER_PLAYLISTS_LOADED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADED'
                },
                playlists: action.playlists
            };

        case types.ADD_CURRENT_PLAYLIST_ID:
            return {
                ...state,
                currentPlaylist: action.currentPlaylist
            };

        default:
            return state;
    }
}