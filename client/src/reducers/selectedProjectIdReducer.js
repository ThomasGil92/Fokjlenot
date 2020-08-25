import { SELECTED_PROJECT,CLEAR_SELECTED_PROJECT } from '../actions';

const initialState = {}
export default function selectedProjectIdReducer(state = initialState, action) {
    switch (action.type) {
        case SELECTED_PROJECT:
            return action.selectedProjectId
        case CLEAR_SELECTED_PROJECT:
            return action.selectedProjectId
        
        default:
            return state;
    }
}