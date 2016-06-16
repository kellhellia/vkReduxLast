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
        let fetchStatus = this.props.currentPlaylist.fetchStatus.value;

        return (
            <div>
                <UserSearch />

                <h4>Playlist songs:</h4>

                {
                    fetchStatus === 'LOADING' && (
                        <div>Loading songs...</div>
                    )
                }
                {
                    fetchStatus === 'FAILED' && (
                        <div>Loading songs failed</div>
                    )
                }
                {
                    fetchStatus === 'LOADED' && (
                        this.props.currentPlaylist.value.songs.map((track, index) => {
                            return <div key={index}>{track.artist} - {track.title}</div>
                        })
                    )
                }
            </div>
        )

    }
}

PlaylistEdit = connect(state => state)(PlaylistEdit);

export default PlaylistEdit;