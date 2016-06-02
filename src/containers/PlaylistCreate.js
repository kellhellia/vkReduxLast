import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';

import UserSearch from './UserSearch';

class PlaylistCreate extends Component {
    render() {
        console.log(this.props.params);
        return (
            <div className="playlist-create">
                <UserSearch />

                <h3>Playlist songs:</h3>
            </div>
        )

    }
}

PlaylistCreate = connect(state => state)(PlaylistCreate);

export default PlaylistCreate;