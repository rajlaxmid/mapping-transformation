import React from 'react';
import ReactDOM from 'react-dom';
import {Router , Route ,IndexRoute, hashHistory, browserHistory} from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { dispatch, Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import Dashboard from './src/pages/Dashboard';
import App from './src/App';

import allReducers from './src/store/reducers';

const loggerMiddleware = createLogger();
const store = createStore(allReducers, applyMiddleware(thunkMiddleware, loggerMiddleware));
ReactDOM.render((
<Provider store={store}>
    <Router history={hashHistory}>
        
        <Route path="/" component={App}>
            <Route path="dashboard" component={Dashboard} />
        </Route>
    </Router>
</Provider>  )     , document.getElementById('display'));