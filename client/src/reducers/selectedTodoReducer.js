import { SET_SELECTED_TODO } from '../actions';

const initialState = {}
export default function selectedIdReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_TODO:
            return action.selectedTodo
        
        default:
            return state;
    }
}