import * as types from '../actions';

let initialState = {
    value: {
        _id: '1',
        friendsIds:[],
        ownerId: 1,
        playlistName: '1',
        songs:[]
    },
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
                },
                ...state.value
            };

        case types.GET_CURRENT_PLAYLIST_LOADED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADED'
                }
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