import { API } from '../config'
import { get } from 'axios'

export const postEmailConf = (email) => {
  return fetch(`${API}/email`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}
export const postEmailPassword = (email) => {
  return fetch(`${API}/emailPassword`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(email)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}

export const getUserByForgotId = forgotId => {
  return fetch(`${API}/resetVerif`,{
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(forgotId)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
}