import * as types from '../actions';

let initialState = [];

export default function comments(state = initialState, action) {
    switch(action.type) {
        case types.ADD_COMMENT:
            // return state.concat(action.user);
            return [...state, action.comment]
        default:
            return state;

    }
}