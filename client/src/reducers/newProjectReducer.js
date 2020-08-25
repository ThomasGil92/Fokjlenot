import { SET_NEW_PROJECT } from '../actions';

const initialState = {}
export default function newProjectReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NEW_PROJECT:
            return action.newProject

        default:
            return state;
    }
}