import { API } from '../config'
import {SET_USER,CLEAR_AUTH_USER,CLEAR_USER,SET_USER_INFOS} from './index'

export function clearUser() {
    return function (dispatch) {
      dispatch({ type: CLEAR_USER, user: '' })
    };
  };
  export function clearAuthUser() {
    return function (dispatch) {
      dispatch({ type: CLEAR_AUTH_USER, authUser: '' })
    };
  };

  export const postUser = (user) => {
    return fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(data => {
        if (data.err) {
          return data.err
        }
        if (!data.err) {
          return data.json();
        };
      })
  }
  
  export const getUser = (user) => {
    return fetch(`${API}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(data => {
        if (data.err) {
          return data.err
        }
        if (!data.err) {
          return data.json();
        }
      }
      )
      .catch(err => {
        console.log(err);
      });
  }
  export const authenticate = (data, remember) => {
    if (!data.err) {
      if (remember === true) {
        localStorage.setItem('jwt', JSON.stringify(data));
        sessionStorage.setItem('jwt', JSON.stringify(data));
      } else {
        sessionStorage.setItem('jwt', JSON.stringify(data));
      }
  
    }
    if (data.err) {
      console.log(data.err)
    }
  }
  
  export function setUser() {
    return function (dispatch) {
      if (localStorage.getItem('jwt') || sessionStorage.getItem('jwt')) {
        dispatch({
          type: SET_USER,
          authUser: true
        })
      }
    }
  }
  export function getUserInfos(userId) {
  
    return fetch(`${API}/user/${userId}`, {
      method: 'GET'
    })
      .then(data => {
        if (data.err) {
          return data.err
        }
        if (!data.err) {
  
          return data.json()
        };
  
      })
  }
  
  export function setUserInfos(data) {
    return function (dispatch) {
      const data2 = data
      dispatch({ type: SET_USER_INFOS, user: data2 })
    }
  }

  export const updateUserProjectsRepo = (userId, token, projet) => {
    return fetch(`${API}/user-update-project/${userId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(projet)
    })
      .then(response => {
        console.log(response)
        return response.json()
      })
      .catch(err => {
        console.log(err)
      })
  }
  export const deleteProjectFromRepo = (userId, project) => {
    return fetch(`${API}/deleteProjectFromRepo/${userId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)
    })
      .then(response => {
        return response.json()
      })
      .catch(err => {
        console.log(err)
      })
  }