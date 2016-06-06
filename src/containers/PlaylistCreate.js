import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { Link } from 'react-router';
import { getNewPlaylistName } from '../actions';

import UserSearch from './UserSearch';

class PlaylistCreate extends Component {
    handleInputChange(e) {
        this.props.dispatch(getNewPlaylistName(e.target.value));
    }

    render() {
        let playlistName = this.props.newPlaylist.playlistName;

        return (
            <div className="playlist-create">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-4">
                        <input
                            className="form-control form-group"
                            placeholder="Введите имя плейлиста"
                            onChange={::this.handleInputChange}
                        />

                        <Link
                            to={`/playlist/new/${playlistName}`}
                            className="btn btn-primary"
                        >Добавить песни</Link>
                    </div>
                </div>
            </div>
        )

    }
}

PlaylistCreate = connect(state => state)(PlaylistCreate);

export default PlaylistCreate;