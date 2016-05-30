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
        // callApi((err, res) => {
        //     if (err) {
        //         return dispatch({ type: 'ADD_USER_FAILED', message: err.message });
        //     }
        // })
    }
};

export const ADD_COMMENT = 'ADD_COMMENT';
export const addComment = comment => ({ type: ADD_COMMENT, comment });

export const GET_USER_TRACKS = 'GET_USER_TRACKS';
export const getUserTracks = track => ({ type: GET_USER_TRACKS, track});