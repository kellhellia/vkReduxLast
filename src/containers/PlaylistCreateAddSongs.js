import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import request from 'superagent';
import { createNewPlaylist } from '../actions';

import UserSearch from './UserSearch';

class PlaylistCreateAddSongs extends Component {
    componentDidMount() {
        let playlistName = this.props.params.playlistName;
        let ownerId = this.props.user.value.id;

        this.props.dispatch(createNewPlaylist(playlistName, ownerId));
    }


    render() {
        return (
            <UserSearch />
        )
    }
}

PlaylistCreateAddSongs = connect(state => state)(PlaylistCreateAddSongs);

export default PlaylistCreateAddSongs;