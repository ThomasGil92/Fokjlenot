import React, { Fragment,useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import RemoveProjectButton from './RemoveProjectButton'
import { getProjectInfos } from '../../actions/project'
const TLMenu = () => {

    const [projectInfos, setProjectInfos] = useState('')

    const init = () => {
        getProjectInfos(JSON.parse(sessionStorage.getItem('selectedProjectId'))).then(project => {
            setProjectInfos(project.data)
        })
    }

    useEffect(() => {
        init()
    }, [])
    return (
        <Fragment>
            <div className="col-md-6 text-center">
                {projectInfos && <h2 className="text-dark">{projectInfos.title}</h2>}
            </div>
            <div className="col-md-6">
                <Link className=" btn btn-outline-info h-100 todoTitleFont mr-1" to={"/"}><i className="fas fa-arrow-circle-left"></i> Revenir aux projets</Link>
                <Link className=" btn btn-outline-dark h-100 todoTitleFont mr-1" to={"/add-todo"}>Ajouter une tâche <i className="far fa-plus-square"></i></Link>
                <RemoveProjectButton />
            </div>
        </Fragment>
    )
}
export default TLMenu