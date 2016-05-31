export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_LOADED = 'ADD_USER_LOADED';
export const ADD_USER_FAILED = 'ADD_USER_FAILED';

export function addUser(id) {
    return (dispatch) => {
        dispatch({type: ADD_USER_REQUEST});

        VK.api('users.get',{
            user_ids: id,
            fields: 'photo_50'
        }, (data) => {
            if (data.response) {
                let user = {
                    id: data.response[0].uid,
                    firstName: data.response[0].first_name,
                    lastName: data.response[0].last_name,
                    userPic: data.response[0].photo_50
                };
                dispatch({ type: ADD_USER_LOADED, user });
            }
        });
    }
};

export const SEARCH_REQUEST = 'SEARCH_REQUEST';
export const SEARCH_LOADED = 'SEARCH_LOADED';
export const SEARCH_FAILED = 'SEARCH_FAILED';

export function search(searchTerm) {
    return (dispatch) => {
        dispatch({type: SEARCH_REQUEST});

        VK.api('audio.search',{
            q: searchTerm
        }, (data) => {
            if (data.response) {
                let songs = data.response;
                dispatch({ type: SEARCH_LOADED, songs, searchTerm });
            }
        });
    }
};

export const GET_SEARCHTERM = 'GET_SEARCHTERM';
export const getSearchTerm = searchTerm => ({ type: GET_SEARCHTERM, searchTerm});

export const GET_USER_TRACKS = 'GET_USER_TRACKS';
export const getUserTracks = track => ({ type: GET_USER_TRACKS, track});
