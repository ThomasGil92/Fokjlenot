import { SET_ACCEPTANCE } from '../actions';

const initialState =  false 
export default function acceptReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ACCEPTANCE:
            return action.accept;
        default:
            return state;
    }
}