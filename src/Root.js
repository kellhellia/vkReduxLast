import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import PlaylistCreate from './containers/PlaylistCreate';

const history = syncHistoryWithStore(browserHistory, store);

console.log(history);

export default class Root extends Component {
  render() {
    return (
       <Provider store={store}>
        <Router history={history}>
          <Route path="/">
            <IndexRoute component={App}/>
            <Route path="playlist/:id" component={PlaylistCreate}/>
          </Route>
        </Router>
      </Provider>
    );
  }
}
