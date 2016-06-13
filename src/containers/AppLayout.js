import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from '../store';
import { addUser, getUserPlaylists } from '../actions';
import { Link } from 'react-router';

import Navbar from './Navbar';
import UserSongs from './UserSongs';
import UserSearch from './UserSearch';

class App extends Component {
    async componentDidMount() {
        await this.init();

        let userId = this.props.user.value.id;
        this.props.getUserPlaylists(userId);
    }

    async init() {
        VK.init({
            apiId: 5098778
        });

        return new Promise((resolve, reject) => {
            VK.Auth.getLoginStatus(async (response) => {
                if (response.session) {
                    await this.props.addUser(response.session.mid);
                    resolve(null);
                } else {
                    reject(new Error('not auth'));
                }
            });
        });
    }

    render() {
        let user = this.props.user.value;

        return (
            <div>
                <div className="container-fluid">
                    <Navbar />
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App = connect(state => state, { addUser, getUserPlaylists})(App);

export default App;