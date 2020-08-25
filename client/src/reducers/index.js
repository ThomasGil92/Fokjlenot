import { combineReducers } from 'redux';
import authUser from './authUserReducer';
import accept from './acceptReducer';
import alert from './alertReducer';
import projects from './projectsReducer';
import selectedProjectId from './selectedProjectIdReducer';
import todosId from './todosReducer';
import todos from './todosItemReducer';
import newProject from './newProjectReducer';
import user from './userReducer';
import selectedTodo from './selectedTodoReducer';
import subtasks from './subtasksReducer';

export default combineReducers({
  authUser,
  user,
  accept,
  alert,
  projects,
  selectedProjectId,
  todosId,
  todos,
  newProject,
  selectedTodo,
  subtasks

  
});