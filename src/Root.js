import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import store from './store';
import { addUser, addComment } from './actions';
import request from 'superagent';

import Navbar from './containers/Navbar';
import UserSongs from './containers/UserSongs';

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

    addComment() {
        this.props.dispatch(addComment({ comment: 'bla bla ty mudak'}));
    }

    addUserAsync() {
        this.props.dispatch(addUserAsync({name: 'Async', age: '100'}));
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container-fluid">
                    <UserSongs />
                </div>
            </div>
        );
    }
}

App = connect(state => state)(App);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
