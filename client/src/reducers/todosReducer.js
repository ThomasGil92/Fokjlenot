import { GET_TODOS,CLEAR_TODOS_ID } from '../actions'
const initialState = [];
export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TODOS:
            return action.todosId;
        case CLEAR_TODOS_ID:
            return action.todosId;
            
        default:
            return state;
    }
}