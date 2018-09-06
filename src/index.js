import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import authReducer from './store/reducers/auth'
import transactionReducer from './store/reducers/transaction'
import projectReducer from './store/reducers/project'
import dateRangeReducer from './store/reducers/dateRange'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    transaction: transactionReducer,
    project: projectReducer,
    date: dateRangeReducer
})

const store = createStore(
    rootReducer, 
    composeEnhancers(
        applyMiddleware(thunk)
))

const app = (
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

