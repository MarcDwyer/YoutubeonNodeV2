import {FEATURED} from '../actions/index';

export default function(state = null, action) {
    switch (action.type) {
        case FEATURED:
        return action.payload
    }
    return state;
}