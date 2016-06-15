import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import request from 'superagent';
import { getCurrentPlaylist } from '../actions';

import UserSearch from './UserSearch';

class PlaylistEdit extends Component {
    componentDidMount() {
        let playlistId = this.props.params.playlistId;

        this.props.dispatch(getCurrentPlaylist(playlistId));
    }

    render() {
        return (
            <div>
                <UserSearch />

                <p>play edit</p>
            </div>
        )

    }
}

PlaylistEdit = connect(state => state)(PlaylistEdit);

export default PlaylistEdit;