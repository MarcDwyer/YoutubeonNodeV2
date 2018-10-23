import { combineReducers } from 'redux';
import GetStreamers from './reducer_getstreamers';
import ActiveStreamers from './reducer_activestreams';
import NetworkRequest from './reducer_network'

const rootReducer = combineReducers({
    streamerData: GetStreamers,
    activeStreamers: ActiveStreamers,
    networkrequest: NetworkRequest
});

export default rootReducer;
