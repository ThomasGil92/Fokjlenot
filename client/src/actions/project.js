import { API } from '../config'
import { get } from 'axios'
import {CLEAR_SELECTED_PROJECT,CLEAR_PROJECTS,GET_PROJECTS,SELECTED_PROJECT,SET_NEW_PROJECT} from './index'

export function clearSelectedProject() {
    return function (dispatch) {
      dispatch({ type: CLEAR_SELECTED_PROJECT, selectedProjectId: "" })
    };
  };

  export function clearProjects() {
    return function (dispatch) {
      dispatch({ type: CLEAR_PROJECTS, projects: '' })
    };
  };

  export function getProjects(userProjectId) {

    return function (dispatch) {
      return get(`${API}/project/${userProjectId}`)
        .then(project => {
          dispatch({ type: GET_PROJECTS, projects: project.data })
        })
        .catch(function (err) { console.log('error', err) })
    }
  }

  export function setSelectedProjectId(projectId) {
    return function (dispatch) {
      localStorage.setItem("selectedProjectId", JSON.stringify(projectId))
      sessionStorage.setItem("selectedProjectId", JSON.stringify(projectId))
  
      dispatch({
        type: SELECTED_PROJECT,
        selectedProjectId: projectId
      })
    }
  }

  export const postProject = (userId, token, project) => {
    return fetch(`${API}/project/create/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(project)
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  export function setNewProject(newProject) {
    return function (dispatch) {
      dispatch({ type: SET_NEW_PROJECT, newProject: newProject })
    };
  }
  
  
  
  export const deleteTodoFromRepo = (projectId, todoId) => {
    return fetch(`${API}/deleteTodoFromRepo/${projectId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(todoId)
    })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err)
        console.log(projectId, todoId)
      })
  }
  export function suppressProjectById(projectId, token, userId) {
    return fetch(`${API}/project/${projectId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  }
  export function getProjectInfos(projectId){
    return get(`${API}/project/${projectId}`)
    .then(project => {
      return project
    })
    .catch(function (err) { console.log('error', err) })
  }