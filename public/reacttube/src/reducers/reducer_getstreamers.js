import {STREAMER} from '../actions/index';

export default function (state = [], action) {
    
    switch(action.type) {
        case STREAMER:
        state = []
        return [...state, ...action.payload];
    }
    return state;
}