import {ISTOGGLED} from '../actions/index';

export default function(state = false, action) {
    switch (action.type) {
        case ISTOGGLED:
        return action.payload
    }
    return state;
}