import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import request from 'superagent';
import { getCurrentPlaylist, removeTrackFromPlaylist } from '../actions';

import UserSearch from './UserSearch';

class PlaylistEdit extends Component {
    componentDidMount() {
        let playlistId = this.props.params.playlistId;
        this.props.dispatch(getCurrentPlaylist(playlistId));
    }

    handleRemoveTrackBtn(trackId) {
        let playlistId = this.props.params.playlistId;
        this.props.dispatch(removeTrackFromPlaylist(playlistId, trackId));
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
                            let trackId = track.trackId;

                            return (
                                <div className="row form-group" key={index}>
                                    <div className="col-xs-2">
                                        <span>{track.artist} - {track.title}</span>
                                    </div>
                                    <div className="col-xs-2">
                                        <button
                                            className="btn btn-danger"
                                            onClick={this.handleRemoveTrackBtn.bind(this, {trackId})}
                                        >Remove track</button>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>
        )

    }
}

PlaylistEdit = connect(state => state)(PlaylistEdit);

export default PlaylistEdit;