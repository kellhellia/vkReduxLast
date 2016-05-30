import * as types from '../actions';

let initialState = [];

export default function tracks(state = initialState, action) {
    switch(action.type) {
        case types.GET_USER_TRACKS:
            return [...state, ...action.track]
        default:
            return state;
    }
}