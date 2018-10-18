import { combineReducers } from 'redux';
import GetStreamers from './reducer_getstreamers';
import ActiveStreamers from './reducer_activestreams';


const rootReducer = combineReducers({
    streamerData: GetStreamers,
    activeStreamers: ActiveStreamers
});

export default rootReducer;
