import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import MainApp from './containers/stream_list';
import Navbar from './components/navbar';
import ActiveStreams from './containers/active_streamers'
import TopStream from './containers/top_streamer';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
    <div>
    <Navbar />
    <TopStream />
    <ActiveStreams />
    <MainApp />
    </div>
</Provider>
,document.getElementById('root'));