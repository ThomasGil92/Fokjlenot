import React from 'react'
import { clearTodos, clearTodosId } from "../../actions"
import { clearProjects, getProjects } from "../../actions/project"
import { clearUser, clearAuthUser, setUser, setUserInfos, getUserInfos } from "../../actions/user"
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
const HomeMenu = () => {
    const dispatch = useDispatch();

    const signoutClick = e => {
        e.preventDefault()
        if (localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt')

        }
        if (sessionStorage.getItem('jwt')) {
            sessionStorage.removeItem('jwt')
            sessionStorage.removeItem('selectedProjectId')
            //Because i setItem "selectedProjectId" in both
            localStorage.removeItem('selectedProjectId')
        }
        dispatch(clearUser())
        dispatch(clearProjects())
        dispatch(clearTodosId())
        dispatch(clearTodos())
        dispatch(clearAuthUser())

    }

    const refreshData = e => {
        e.preventDefault()
        dispatch(clearUser())
        dispatch(clearProjects())
        dispatch(clearTodosId())
        dispatch(clearTodos())
        if (sessionStorage.getItem('jwt')) {
            getUserInfos(JSON.parse(sessionStorage.getItem('jwt')).user._id).then(user => {
                if (user.confirmed === true) {
                    dispatch(setUser());
                    dispatch(setUserInfos(user))
                    if (user.projectsId) {
                        user.projectsId.forEach(projectItem => {
                            dispatch(getProjects(projectItem))
                        })
                    }
                }

            })
        }
    }

    return (
        <nav id="homeTop" className="navbar navbar-light d-flex justify-content-between text-center position-absolute col-12 bg-white" style={{ left: "0", top: '0', zIndex: "10", boxShadow: "0px 0px 20px black" }}>
            <div className="d-none d-md-block col-md-3">
                <p className="text-dark mb-0 py-1 text-left" >bêta V2.0</p>
            </div>
            <div className="col-md-6">
                <h1 onClick={refreshData} className="text-white mb-0 py-1 mx-auto "><Link className="navbar-brand mySpecialFont" to={"/"}>Fokjlenot</Link></h1>
            </div>
            {sessionStorage.getItem('jwt') ? (
                <div className="col-6 col-md-3 mx-auto mx-md-0 text-md-right ml-md-auto my-2 my-md-0 todoTitleFont">
                    <button onClick={signoutClick} className="btn btn-outline-dark mb-0 py-1" >Déconnexion</button>
                </div>
            ) : (
                    <div className="col-md-3 ">
                        <Link to={"/signin"} className="btn btn-outline-dark mb-0 py-1 mx-1"><span className="todoTitleFont">Se connecter</span></Link>
                        <Link to={"/signup"} className="btn btn-outline-dark mb-0 py-1 mx-1"><span className="todoTitleFont">S'inscrire</span></Link>
                    </div>
                )}
        </nav>
    )
}

export default HomeMenu