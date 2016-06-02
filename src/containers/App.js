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
        let user = this.props.user.value;
        return (
            <div>
                <div className="container-fluid">
                    <Link to={`/playlist/new`} className="btn btn-primary">Create playlist</Link>
                </div>
            </div>
        );
    }
}

App = connect(state => state)(App);

export default App;