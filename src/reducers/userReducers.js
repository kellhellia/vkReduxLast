import * as types from '../actions';

let initialState = {
    value: {
        firstName: 'firstName',
        lastName: 'lastName',
        id: 1,
        userPic: 'userPic'
    },
    fetchStatus: {}
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

        default:
            return state;
    }
}