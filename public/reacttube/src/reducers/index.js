import { combineReducers } from 'redux';
import GetStreamers from './reducer_getstreamers';
import ActiveStreamers from './reducer_activestreams';
import FeaturedStream from './reducer_featured';

const rootReducer = combineReducers({
    streamerData: GetStreamers,
    activeStreamers: ActiveStreamers,
    featured: FeaturedStream
})

export default rootReducer;
