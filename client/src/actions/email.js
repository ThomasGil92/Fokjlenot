import { API } from '../config'

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