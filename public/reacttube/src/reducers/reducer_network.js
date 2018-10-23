import {NET_REQUEST} from '../actions/index';

export default function (state = 0, action) {
    switch(action.type) {
        case NET_REQUEST:
        return state + action.payload;
    }
    return state;
}