import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from '../store';
import { addUser } from '../actions';
import { Link } from 'react-router';

import Navbar from './Navbar';
import UserSongs from './UserSongs';
import UserSearch from './UserSearch';

class App extends Component {
    render() {
        let userPlaylists = this.props.playlists.value;

        let playlists = userPlaylists ? userPlaylists.map((playlist, index) => {
            let playlistUrl = `/playlist/${playlist._id}`;

            return (
                <Link key={index} to={playlistUrl} className="col-xs-3">
                    <p>{playlist._id}</p>
                    <p>{playlist.playlistName}</p>
                </Link>
            );
        }) : <span />;

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        {playlists}
                    </div>
                    <Link to={`/playlist/new`} className="btn btn-primary">Create playlist</Link>
                </div>
            </div>
        );
    }
}

App = connect(state => state)(App);

export default App;