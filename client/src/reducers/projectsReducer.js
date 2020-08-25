import { GET_PROJECTS, CLEAR_PROJECTS } from '../actions';



const initialState = []
export default function projectsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PROJECTS:
            return [
                ...state, action.projects
            ]
        case CLEAR_PROJECTS:
            return action.projects
        default:
            return state;
    }
}