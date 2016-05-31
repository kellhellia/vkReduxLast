import * as types from '../actions';

let initialState = {
    value: {
        searchTerm: '',
        searchResults: []
    },
    fetchStatus: {
        value: ''
    }
};

export default function userSearch(state = initialState, action) {
    switch(action.type) {
        case types.SEARCH_REQUEST:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADING'
                }
            };
        case types.SEARCH_FAILED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'FAILED',
                    message: action.message
                }
            };

        case types.SEARCH_LOADED:
            return {
                ...state,
                fetchStatus: {
                    ...state.fetchStatus,
                    value: 'LOADED'
                },
                value: {
                    searchTerm: action.searchTerm,
                    searchResults: action.songs
                }
            };

        case types.GET_SEARCHTERM:
            return {
                ...state,
                value: {
                    searchTerm: action.searchTerm
                }
            };

        default:
            return state;
    }
}