import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import css from './index.module.css';
import App from './App';
import { IconContext } from "react-icons";

import registerServiceWorker from './registerServiceWorker';

import authReducer from './store/reducers/auth'
import vehicleReducer from './store/reducers/vehicle'

// old
import transactionReducer from './store/reducers/transaction'
import projectReducer from './store/reducers/project'
import dateRangeReducer from './store/reducers/dateRange'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    vehicle: vehicleReducer,

    // old
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
            <IconContext.Provider value={{ color: "#4C9F70", className: css.Icons_size }}>
                <App />
            </IconContext.Provider>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

