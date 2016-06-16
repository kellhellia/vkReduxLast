import * as types from '../actions';

let initialState = {
    fetchStatus: {},
    value: []
};

// TBD: Need to refactor and divide logic of playlists and user

export default function playlists(state = initialState, action) {
    switch(action.type) {
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
                value: action.playlists
            };

        default:
            return state;
    }
}