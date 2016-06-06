import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import request from 'superagent';

import UserSearch from './UserSearch';

class PlaylistCreateAddSongs extends Component {
    componentDidMount() {
        request
            .post('http://localhost:3000/playlist/new')
            .send({
                ownerId: this.props.user.value.id,
                playlistName: this.props.params.playlistName
             })
            .set('Accept', 'application/json')
            .end(function(err, res){
                if (err || !res.ok) {
                    console.log(err);
                } else {
                    console.log(res);
                }
            });
    }


    render() {
        return (
            <UserSearch />
        )

    }
}

PlaylistCreateAddSongs = connect(state => state)(PlaylistCreateAddSongs);

export default PlaylistCreateAddSongs;