import request from 'superagent';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_LOADED = 'ADD_USER_LOADED';
export const ADD_USER_FAILED = 'ADD_USER_FAILED';

export function addUser(userId) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            VK.api('users.get',{
                user_ids: userId,
                fields: 'photo_50'
            }, (data) => {
                if (data.response) {
                    let userData = data.response[0];
                    let user = {
                        id: userData.uid,
                        firstName: userData.first_name,
                        lastName: userData.last_name,
                        userPic: userData.photo_50
                    };
                    dispatch({ type: ADD_USER_LOADED, user });
                    resolve();
                } else {
                    reject(new Error('no response'));
                }
            });
        });
    }

}

// export function addUser(userId, callback) {
//     return (dispatch) => {
//         dispatch({type: ADD_USER_REQUEST});

//         VK.api('users.get',{
//             user_ids: userId,
//             fields: 'photo_50'
//         }, (data) => {
//             if (data.response) {
//                 let userData = data.response[0];
//                 let user = {
//                     id: userData.uid,
//                     firstName: userData.first_name,
//                     lastName: userData.last_name,
//                     userPic: userData.photo_50
//                 };
//                 dispatch({ type: ADD_USER_LOADED, user });
//                 callback(null);
//             }
//         });
//     }
// };

export const GET_USER_PLAYLISTS = 'GET_USER_PLAYLISTS';
export const GET_USER_PLAYLISTS_LOADED = 'GET_PLAYLISTS_LOADED';
export const GET_USER_PLAYLISTS_FAILED = 'GET_PLAYLISTS_FAILED';

export function getUserPlaylists(userId) {
    return (dispatch) => {
        dispatch({type: GET_USER_PLAYLISTS});

        request
            .get(`http://localhost:3000/playlists/${userId}`)
            .send({
                ownerId: userId
             })
            .set('Accept', 'application/json')
            .end(function(err, res){
                if (err || !res.ok) {
                    dispatch({ type: GET_USER_PLAYLISTS_FAILED });
                } else {
                    console.log(res);

                    let playlists = res;
                    dispatch({ type: GET_USER_PLAYLISTS_LOADED, playlists });
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
                console.log(songs);
            }
        });
    }
};

export const GET_SEARCHTERM = 'GET_SEARCHTERM';
export const getSearchTerm = searchTerm => ({ type: GET_SEARCHTERM, searchTerm});

export const GET_NEW_PLAYLIST_NAME = 'GET_NEW_PLAYLIST_NAME';
export const getNewPlaylistName = playlistName => ({ type: GET_NEW_PLAYLIST_NAME, playlistName});

export const GET_USER_TRACKS = 'GET_USER_TRACKS';
export const getUserTracks = track => ({ type: GET_USER_TRACKS, track});
