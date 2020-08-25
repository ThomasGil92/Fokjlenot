import {  ADD_SUB,CLEAR_SUB} from '../actions'
const initialState = [];
export default function subtasksReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SUB:
            return [action.subtasks,...state];
            
             case CLEAR_SUB:
            return action.subtasks;
        default:
            return state;
    }
}