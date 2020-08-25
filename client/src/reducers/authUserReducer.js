import { SET_USER,CLEAR_AUTH_USER } from '../actions';

const initialState = false
export default function authUserReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return action.authUser;
        case CLEAR_AUTH_USER:
            return action.authUser;
        default:
            return state;
    }
}