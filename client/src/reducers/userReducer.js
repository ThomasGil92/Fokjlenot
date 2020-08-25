import { SET_USER_INFOS, CLEAR_USER } from '../actions';

const initialState = []
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER_INFOS:
            return action.user
        case CLEAR_USER:
            return action.user
        default:
            return state;
    }
}