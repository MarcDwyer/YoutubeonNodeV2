import { combineReducers } from 'redux';
import GetStreamers from './reducer_getstreamers';
import ActiveStreamers from './reducer_activestreams';
import IsPlaying from './reducer_istoggled';
import CurrentStream from './reducer_currentstreamer';

const rootReducer = combineReducers({
    streamerData: GetStreamers,
    activeStreamers: ActiveStreamers,
    isplaying: IsPlaying,
    viewedStream: CurrentStream

})

export default rootReducer;