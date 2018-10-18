import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import MainApp from './containers/stream_list';
import ActiveStreams from './containers/active_streamers'

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);


ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
  <div>
    <ActiveStreams />
    <MainApp />
  </div>
</Provider>
,document.getElementById('root'));
