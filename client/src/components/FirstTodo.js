import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { postTodo, updateTodoProjectRepo, } from '../actions'
import { clearProjects, getProjects } from '../actions/project'
import { getUserInfos, setUserInfos } from '../actions/user'
import Alert from './Layout/Alert'
import HomeMenu from './HomePageComponents/HomeMenu'
import Footer from './Layout/Footer'
import Cookie from './Layout/Cookie'

const FirstTodo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const newProject = useSelector(state => state.newProject);
    const [firstTodo, setFields] = useState({
        title: '',
        description: '',
        dead_line: ''/* ,
        task_begin: '' */
    })


    const handleChange = e => {
        const value = e.target.value;
        setFields({ ...firstTodo, [e.target.name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        postTodo(JSON.parse(sessionStorage.getItem('jwt')).user._id, JSON.parse(sessionStorage.getItem('jwt')).token, firstTodo)
            .then(data => {
                console.log(data)
                updateTodoProjectRepo(newProject.justCreatedProject._id, data)
                    .then(() => {
                        dispatch(clearProjects())
                        if (sessionStorage.getItem('jwt')) {
                            getUserInfos(JSON.parse(sessionStorage.getItem('jwt')).user._id).then(user => {
                                console.log(user)
                                dispatch(setUserInfos(user))
                                if (user.projectsId) {
                                    user.projectsId.forEach(projectItem => {
                                        dispatch(getProjects(projectItem))
                                    })
                                }
                            })
                        }
                        if (localStorage.getItem('jwt')) {
                            getUserInfos(JSON.parse(localStorage.getItem('jwt')).user._id).then(user => {
                                console.log(user)
                                dispatch(setUserInfos(user))
                                if (user.projectsId) {
                                    user.projectsId.forEach(projectItem => {
                                        dispatch(getProjects(projectItem))
                                    })
                                }
                            })
                        }
                        history.push("/")
                    })

            })
            .catch(function (err) { console.log(err); });
    }
    return (
        <div className="container-fluid vh-100 d-flex align-items-center text-fokjlenot">
            <Footer anchor={"#homeTop"} />
            <HomeMenu />
            <Alert />

            <Cookie />
            <div className="row vw-100 pt-5 mt-5 mb-5">
                <div className="col-12 card mx-auto bg-orange mt-5 border-0" >
                    <div className="card-body">
                        <h4 className="card-title mb-4 text-center">Première tâche à effectuer</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <input type="text" name="title" required value={firstTodo.title} onChange={handleChange} className="form-control" placeholder="Nom de la tâche" />
                            </div>
                            <div className="form-group mb-4">
                                <textarea name="description" type="text" rows="5" value={firstTodo.description} onChange={handleChange} className="form-control" placeholder="Description de la tâche (optionel)" />
                            </div>
                            <div className="form-group mb-4">
                                <label >A finir pour le:</label>
                                <input type="date" name="dead_line" value={firstTodo.dead_line} onChange={handleChange} className="form-control" placeholder="Date limite (recommandé)" />
                            </div>{/* 
                        <div className="form-group mb-4">
                            <label >Début de la tâche:</label>
                            <input type="date" name="task_begin" value={firstTodo.task_begin} onChange={handleChange} className="form-control" placeholder="Début du projet" />
                        </div> */}
                            <div>
                                <Link className="col-12 btn btn-outline-info text-center mb-2" to={"/"}><i className="fas fa-angle-double-left"></i>  Revenir à l'accueil</Link>
                                <input type="submit" value="Ajouter cette première tâche" className="btn btn-primary col-12" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FirstTodo