import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { clearTodos, clearTodosId } from '../../actions'
import { setSelectedProjectId } from '../../actions/project'
import Footer from '../Layout/Footer'


const HomeProjectList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const projectsId = useSelector(function (state) { return state.projectsId });
    const projects = useSelector(function (state) { return state.projects });
    const user = useSelector(function (state) { return state.user });

    const handleSelectedProject = e => {
        e.preventDefault()
        dispatch(clearTodosId())
        dispatch(clearTodos())
        dispatch(setSelectedProjectId(e.target.id))
        history.push("/todos-list")
    }

    return (
        <div className="row m-0 h-100 justify-content-center bg-white d-flex align-items-center">

            <div className="col-md-4 text-dark text-center">

                {projects.length > 0 ? (
                    <div className="text-center">
                        <p className="lead mt-4 text-dark">"Bonjour {user.name}, quel projet dois-je ouvrir?"</p>
                        {projects.map((project, i) => {
                            return (
                                <div className="card mt-2" key={i}>
                                    <Link to="/todos-list" className="btn btn-primary todoTitleFont" id={project._id} onClick={handleSelectedProject}>{project.title}</Link>

                                </div>
                            )
                        })}
                    </div>
                ) : (
                        <p>Aucun projet en cours</p>
                    )}


                <Link to="/new-project" className="text-dark">+ Ajouter un nouveau projet</Link>
            </div >
            <Footer anchor={"#homeTop"} />
        </div>
    )
}

export default HomeProjectList