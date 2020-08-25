import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { setAccept,setAlert } from './actions';
import { getProjects } from './actions/project';
import { setUser, getUserInfos, setUserInfos } from './actions/user';

/* const invariant=require('redux-immutable-state-invariant').default() */


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, logger)));
store.dispatch(setAccept());
if (sessionStorage.getItem('jwt')) {
  getUserInfos(JSON.parse(sessionStorage.getItem('jwt')).user._id).then(user => {
    if (user.confirmed === true) {
      store.dispatch(setUser());
      store.dispatch(setUserInfos(user))
      if (user.projectsId) {
        user.projectsId.forEach(projectItem => {
          store.dispatch(getProjects(projectItem))
        })
      }
    }
    
  })
}
/* if (localStorage.getItem('jwt')) {
  getUserInfos(JSON.parse(localStorage.getItem('jwt')).user._id).then(user => {
    console.log(user)
    store.dispatch(setUserInfos(user))
    if (user.projectsId) {
      user.projectsId.forEach(projectItem => {
        store.dispatch(getProjects(projectItem))
      })
    }
  })
} */



ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
