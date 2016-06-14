import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import request from 'superagent';
import { addCurrentPlaylistId } from '../actions';

import UserSearch from './UserSearch';

class PlaylistEdit extends Component {
    componentDidMount() {
        let playlistId = this.props.params.playlistId;

        request
            .get(`http://localhost:3000/playlist/${playlistId}`)
            .set('Accept', 'application/json')
            .end(function(err, res){
                if (err || !res.ok) {
                    console.log(err);
                } else {
                    console.log('oks')
                }
            });

        this.props.dispatch(addCurrentPlaylistId(playlistId));
    }

    render() {
        return (
            <div>
                <UserSearch />

                <p>Playlist edit blyat</p>
            </div>
        )

    }
}

PlaylistEdit = connect(state => state)(PlaylistEdit);

export default PlaylistEdit;