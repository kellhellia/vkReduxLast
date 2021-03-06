import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from '../store';
import { addUser, getUserPlaylists, getUserFriends } from '../actions';
import { Link } from 'react-router';

import Navbar from './Navbar';
import UserSongs from './UserSongs';

class AppLayout extends Component {
    async componentDidMount() {
        await this.init();

        let userId = this.props.user.value.id;
        this.props.getUserPlaylists(userId);
        this.props.getUserFriends();
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
        console.log(user);

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

AppLayout = connect(state => state, { addUser, getUserPlaylists, getUserFriends})(AppLayout);

export default AppLayout;