import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './containers/App';
import AppLayout from './containers/AppLayout';
import PlaylistCreate from './containers/PlaylistCreate';
import PlaylistCreateAddSongs from './containers/PlaylistCreateAddSongs';

const history = syncHistoryWithStore(browserHistory, store);

console.log(history);

export default class Root extends Component {
  render() {
    return (
       <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={AppLayout}>
            <IndexRoute component={App}/>
            <Route path="playlist/new" component={PlaylistCreate}/>
            <Route path="playlist/new/:playlistName" component={PlaylistCreateAddSongs}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
