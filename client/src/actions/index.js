import { API } from '../config'
import { get } from 'axios'

export const SET_USER = "SET_USER"
export const SET_ACCEPTANCE = 'SET_ACCEPTANCE';
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const CLEAR_AUTH_USER = 'CLEAR_AUTH_USER'
export const CLEAR_USER = 'CLEAR_USER'
export const CLEAR_PROJECTS = 'CLEAR_PROJECTS'
export const CLEAR_TODOS_ID = 'CLEAR_TODOS_ID'
export const CLEAR_TODOS = 'CLEAR_TODOS'
export const CLEAR_SELECTED_PROJECT = 'CLEAR_SELECTED_PROJECT'
export const CLEAR_SUB = 'CLEAR_SUB'
export const GET_PROJECTS = 'GET_PROJECTS'
export const SELECTED_PROJECT = 'SELECTED_PROJECT'
export const SET_NEW_PROJECT = 'SET_NEW_PROJECT'
export const GET_TODOS = 'GET_TODOS'
export const SET_TODO = 'SET_TODO'
export const SET_USER_INFOS = 'SET_USER_INFOS'
export const ADD_SUB = 'ADD_SUB'
export const SET_SELECTED_TODO = 'SET_SELECTED_TODO'



export function setAccept() {
  return function (dispatch) {
    if (!document.cookie.indexOf("user-has-accepted-cookies")) {
      dispatch({ type: SET_ACCEPTANCE, accept: true })
    };
  }
};

export function setSubtasks(subtaskId) {
  return function (dispatch) {
    return get(`${API}/subtask/${subtaskId}`, {
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      }
    })
      .then(subtask => {
        dispatch({ type: ADD_SUB, subtasks: subtask.data })
        return subtask
      })

  }
}

export function clearTodos() {
  return function (dispatch) {
    dispatch({ type: CLEAR_TODOS, todos: [] })
  };
};
export function clearSubtasks() {
  return function (dispatch) {
    dispatch({ type: CLEAR_SUB, subtasks: [] })
  };
};
export function clearTodosId() {
  return function (dispatch) {
    dispatch({ type: CLEAR_TODOS_ID, todosId: '' })
  };
};




export function setAlert(msg, alertType, timeout = 5000) {
  return function (dispatch) {

    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType }
    })
    setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout)
  }
}

export function setTodosByProjectId(projectId) {

  return function (dispatch) {
    return get(`${API}/project/${projectId}`)
      .then(project => {
        if (project.data.todo.length) {
          dispatch({ type: GET_TODOS, todosId: project.data.todo })
        } else {
          console.log("Aucune tâche en cours pour ce projet")
        }
      })
      .catch(function (error) { console.log('error', error) })
  }
}
export function postTodo(userId, token, todo) {
  return fetch(`${API}/todo/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(todo)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}

export function supressTodoById(todoId, token, userId) {
  return fetch(`${API}/todo/${todoId}/${userId}`, {
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

export function setTodoItem(todoItemId) {
  return function (dispatch) {
    return get(`${API}/todo/${todoItemId}`)
      .then(todo => {
        dispatch({ type: SET_TODO, todos: todo.data })

      })
  }
}
export function setSelectedTodo(todoId) {
  return function (dispatch) {
    return get(`${API}/todo/${todoId}`)
      .then(todo => {
        dispatch({ type: SET_SELECTED_TODO, selectedTodo: todo.data })
        todo.data.subtaskList.forEach(sub => {
          dispatch(setSubtasks(sub))
        })
      })
  }
}
export const updateTodoProjectRepo = (projectId, todoId) => {
  return fetch(`${API}/updateTodoRepo/${projectId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(todoId)
  })
    .then(response => {
      console.log(response)
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}


export const updateTodoCategory = (todoId, category) => {
  return fetch(`${API}/todo/${todoId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}
export const updateTodoBgColor = (todoId, bgColor) => {
  return fetch(`${API}/todoColor/${todoId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(bgColor)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

export const postSubtask = (subTask) => {
  return fetch(`${API}/subtask/`, {
    method: 'POST',
    headers: {
      Accept: 'Application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify(subTask)
  })
    .then((response, err) => {
      if (err) {
        console.log(err)
      }
      return response.json()
    })

}
export const focus = () => {
  var OSName = "Unknown OS"
  if (navigator.platform.indexOf("Linux") != -1) { OSName = "Linux" };
  if (navigator.platform.indexOf("iPhone") != -1) { OSName = "ios" };
  if (document.getElementById("homeTop")) {
    if (OSName === "Linux") {
      document.getElementById("homeTop").style.visibility = "hidden"
    }
    /* if (OSName === "ios") {
      document.getElementById("homeTop").style.color = "red"
      document.getElementById("homeTop").style.height = "200px"
    } */
  } 

  /*if (window.innerWidth <= 700) {
    if (document.getElementById("homeTop")) {
      if (window.navigator.platform.indexOf("Linux"||"null"||"Android")) {
        document.getElementById("homeTop").style.visibility = "hidden"
      }
       if (window.navigator.platform === "iPhone") {
        document.getElementById("homeTop").style.visibility = "visible"
      } 
    }
  }*/
}
export const focusOff = () => {
  if (window.innerWidth <= 700) {
    if (document.getElementById("homeTop")) {
      document.getElementById("homeTop").style.visibility = "visible"
    }
  }
}


