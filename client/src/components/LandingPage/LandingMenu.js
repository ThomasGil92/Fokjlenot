import React from 'react'
import { clearTodos } from "../../actions"
import { clearProjects } from "../../actions/project"
import { clearUser, clearAuthUser } from "../../actions/user"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'

const LandingMenu = () => {
    const dispatch = useDispatch();
    const authUser = useSelector(function (state) { return state.authUser });
    const signoutClick = () => {
        dispatch(clearUser())
        dispatch(clearProjects())
        dispatch(clearAuthUser())
        dispatch(clearTodos())
        if (sessionStorage.getItem('jwt')) {
            sessionStorage.removeItem('jwt')
            sessionStorage.removeItem('selectedProject')
        }
        if (localStorage.getItem('jwt')) {
            localStorage.removeItem('jwt')
            localStorage.removeItem('selectedProject')
        }

        window.location.reload();
    }
    return (
        <nav id="landingTop" className="navbar navbar-light d-flex justify-content-between text-center position-absolute w-100 bg-orange" style={{ left: "0", top: '0', zIndex: "10", boxShadow: "0px 0px 20px black" }}>
            <div className="col-md-3 text-left">
                <p className="text-dark mb-0 py-1" >bêta V1.0</p>
            </div>
            <div className="col-md-4">
                {/* <h1 className="text-white mb-0 py-1 mx-auto "><Link className="navbar-brand mySpecialFont mr-0" to={"/"}>Fokjlenot</Link></h1> */}
            </div>

            {authUser ? (
                <div className="col-md-3 d-flex justify-content-end pt-2">
                    <Link to={"/"} className="btn btn-outline-dark border-0 mb-0 py-1 mx-1" data-toggle="tooltip" data-placement="bottom" title="Consulter mes projets">
                        <i className="fas fa-clipboard-list"></i>
                    </Link>
                    <button onClick={signoutClick} className="btn btn-outline-dark mb-0 py-1 mx-1" >Déconnexion</button>
                </div>
            ) : (
                    <div className="col-3 d-flex justify-content-end todoTitleFont pt-2">
                        <Link to={"/signin"} className="btn btn-outline-dark mb-0 py-1 mx-1"><span style={{ verticalAlign: "sub" }}>Se connecter</span></Link>
                        <Link to={"/signup"} className="btn btn-outline-dark mb-0 py-1 mx-1" ><span style={{ verticalAlign: "sub" }}>S'inscrire</span></Link>
                    </div>
                )}



        </nav>
    )
}

export default LandingMenu