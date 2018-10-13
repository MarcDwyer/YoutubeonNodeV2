import {ACTIVE_STREAMERS} from '../actions/index';

export default function(state = [], action) {
    switch (action.type) {
        case ACTIVE_STREAMERS:
        state = [];
        return [...state, ...action.payload];
    }
    return state;
}