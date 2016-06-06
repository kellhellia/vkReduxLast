import * as types from '../actions';

let initialState = {
    playlistName: ''
};

export default function tracks(state = initialState, action) {
    switch(action.type) {
        case types.GET_NEW_PLAYLIST_NAME:
            return {
                ...state,
                playlistName: action.playlistName
            }
        default:
            return state;
    }
}