import { createStore, applyMiddleware } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export default createStore(
    reducers,
    applyMiddleware(thunk)
);