import * as types from '../actions';

let initialState = {
    friendsModalOpen: false
};

// TBD: Need to refactor and divide logic of playlists and user

export default function app(state = initialState, action) {
    switch(action.type) {
        case types.APP_FRIENDS_MODAL_OPEN:
            return {
                ...state,
                friendsModalOpen: true
            };

        case types.APP_FRIENDS_MODAL_CLOSE:
            return {
                ...state,
                friendsModalOpen: false
            };

        default:
            return state;
    }
}