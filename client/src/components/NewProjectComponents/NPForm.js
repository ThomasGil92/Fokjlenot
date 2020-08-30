import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { setAlert } from '../../actions'
import { postProject, setNewProject, clearProjects, setSelectedProjectId, getProjects } from '../../actions/project'
import { updateUserProjectsRepo, clearUser, setUserInfos, getUserInfos } from '../../actions/user'
import Alert from '../Layout/Alert'
import HomeMenu from '../HomePageComponents/HomeMenu'
import Footer from '../Layout/Footer'

const NPForm = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const [project, setFields] = useState({
        title: '',
        description: '',
        dead_line: ''
    })


    const handleChange = e => {
        const value = e.target.value;
        setFields({ ...project, [e.target.name]: value });
    }
const focus=()=>{
    if(window.innerWidth <= 700){
        document.scrollIntoView(alignToTop);
    }
}
    const handleSubmit = e => {
        e.preventDefault();
        if (sessionStorage.getItem('jwt')) {
            postProject(JSON.parse(sessionStorage.getItem('jwt')).user._id, JSON.parse(sessionStorage.getItem('jwt')).token, project)
                .then(data => {
                    const projet = data
                    if (!data.error) {
                        dispatch(setNewProject(data))
                        dispatch(clearProjects())
                        updateUserProjectsRepo(user._id, JSON.parse(sessionStorage.getItem('jwt')).token, projet)
                        dispatch(clearUser())
                        getUserInfos(JSON.parse(sessionStorage.getItem('jwt')).user._id).then(user => {
                            dispatch(setUserInfos(user))
                            dispatch(clearProjects())
                            if (user.projectsId) {
                                user.projectsId.forEach(projectItem => {
                                    dispatch(getProjects(projectItem))
                                })
                            }
                        })
                        dispatch(setSelectedProjectId(data.justCreatedProject._id))
                        dispatch(setAlert("Un nouveau projet vient d'être ajouté", "success"))
                        history.push("/first-todo")
                    } else {
                        dispatch(setAlert("Ce projet éxiste déja", "danger"))
                        console.log(data.err)
                    }
                })
        }
        /* if (localStorage.getItem('jwt')) {
            postProject(JSON.parse(localStorage.getItem('jwt')).user._id, JSON.parse(localStorage.getItem('jwt')).token, project)
                .then(data => {
                    const projet = data
                    if (!data.error) {
                        dispatch(setNewProject(data))
                        dispatch(clearProjects())
                        updateUserProjectsRepo(user._id, JSON.parse(localStorage.getItem('jwt')).token, projet)
                        console.log(data)
                        dispatch(setSelectedProjectId(data.justCreatedProject._id))
                        dispatch(setAlert("Un nouveau projet vient d'être ajouté", "success"))
                        history.push("/first-todo")
                    } else {
                        dispatch(setAlert("Ce projet éxiste déja", "danger"))
                        console.log(data.err)
                    }
                })
        } */

    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center text-dark bg-white">
            <Alert />

            <Footer anchor={"#homeTop"} />
            <HomeMenu />
            <div id="NPForm" className="row vw-100 ">
                <div className="col-12 col-md-6 card mx-auto bg-orange border-0" >
                    <div className="card-body">
                        <h4 className="card-title mb-4 text-center">Nouveau projet</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <input type="text" name="title" required value={project.title} onFocus={focus} onChange={handleChange} className="form-control" placeholder="Nom du Projet" />
                            </div>
                            <div className="form-group mb-4">
                                <textarea name="description" type="text" rows="5" required value={project.description} onChange={handleChange} className="form-control" placeholder="Description du projet" />
                            </div>
                            <div className="form-group mb-4">
                                <input type="date" name="dead_line" required value={project.dead_line} onChange={handleChange} className="form-control" placeholder="Date Limite" />
                            </div>
                            <div className="d-md-flex justify-content-between">
                                <Link className="d-none d-md-block d-md-flex text-dark align-items-center" to={"/"}><i className="fas fa-angle-double-left mr-1"></i>  Revenir à l'accueil</Link>
                                <input type="submit" value="Démarrer Projet" className="btn btn-primary col-12 col-md-6" />
                                <Link className="col-12 d-md-none d-flex justify-content-center align-items-center text-dark mt-2 " to={"/"}><i className="fas fa-angle-double-left mr-1"></i>  Revenir à l'accueil</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default NPForm