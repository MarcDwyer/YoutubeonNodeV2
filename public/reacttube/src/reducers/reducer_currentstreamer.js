import {CURRENT_STREAM} from '../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case CURRENT_STREAM:
        return action.payload
    }
    return state;
}