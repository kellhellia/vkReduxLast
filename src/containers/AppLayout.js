import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from '../store';
import { addUser } from '../actions';
import { Link } from 'react-router';

import Navbar from './Navbar';
import UserSongs from './UserSongs';
import UserSearch from './UserSearch';

class App extends Component {
    componentDidMount() {
        this.init();
    }

    authInfo(response) {
        if (response.session) {
            this.props.dispatch(addUser(response.session.mid));
        } else {
            console.log('not auth');
        }
    }

    init() {
        VK.init({
            apiId: 5098778
        });

        VK.Auth.getLoginStatus(this.authInfo.bind(this));
    }

    render() {
        let user = this.props.user.value;
        return (
            <div>
                <Navbar />
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

App = connect(state => state)(App);

export default App;