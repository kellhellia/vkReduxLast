import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { Link } from 'react-router';
import { getNewPlaylistName, createNewPlaylist } from '../actions';

import UserSearch from './UserSearch';

class PlaylistCreate extends Component {
    constructor(props, context) {
        super();
        this.router = context.router;
    }
    handleInputChange(e) {
        this.props.dispatch(getNewPlaylistName(e.target.value));
    }

    handleBtnCreate() {
        let playlistName = this.props.newPlaylist.playlistName;
        let ownerId = this.props.user.value.id;

        this.props.dispatch(createNewPlaylist(playlistName, ownerId));

        this.router.push('/');
    }

    render() {
        console.log(this.props);
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

                        <button
                            className="btn btn-primary inline-block"
                            onClick={::this.handleBtnCreate}
                        >Создать плейлист</button>
                    </div>
                </div>
            </div>
        )

    }
}

PlaylistCreate.contextTypes = {
    router: React.PropTypes.object
};

PlaylistCreate = connect(state => state)(PlaylistCreate);

export default PlaylistCreate;