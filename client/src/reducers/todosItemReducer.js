import {  SET_TODO,CLEAR_TODOS} from '../actions'
const initialState = [];
export default function todosItemReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TODO:
            return [action.todos,...state];
            
            case CLEAR_TODOS:
            return action.todos;
        default:
            return state;
    }
}