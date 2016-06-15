import * as types from '../actions';

let initialState = {
    value: {},
    fetchStatus: {}
};

export default function currentPlaylist(state = initialState, action) {
    switch(action.type) {
        case types.GET_CURRENT_PLAYLIST:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADING'
                }
            };

        case types.GET_CURRENT_PLAYLIST_FAILED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'FAILED',
                    message: action.message
                }
            };

        case types.GET_CURRENT_PLAYLIST_LOADED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADED'
                },
                value: action.currentPlaylist
            };

        case types.ADD_CURRENT_PLAYLIST:
            return {
                ...state,
                value: action.currentPlaylist
            }

        default:
            return state;
    }
}