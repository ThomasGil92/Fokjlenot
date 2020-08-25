import React, { Fragment, useEffect } from 'react'
import NPForm from './NewProjectComponents/NPForm'
import Cookie from './Layout/Cookie'
import Footer from './Layout/Footer'
import { useDispatch } from 'react-redux'
import { getProjects, clearProjects } from '../actions/project'
import { getUserInfos } from '../actions/user'

const NewProject = () => {
    const dispatch = useDispatch()
    document.title = "Ajouter un projet"
    const init = () => {
        if (sessionStorage.getItem('jwt')) {
            getUserInfos(JSON.parse(sessionStorage.getItem("jwt")).user._id)
                .then(data => {
                    /* dispatch(setUserInfos(data)) */
                    dispatch(clearProjects())
                    if (data.projectsId) {
                        data.projectsId.forEach(projectItem => {
                            dispatch(getProjects(projectItem))
                        })
                    }
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        init()
    }, [dispatch])
    return (
        <Fragment>
            <Cookie />
            <NPForm />
            <Footer anchor={"#homeTop"} />
        </Fragment>
    )
}

export default NewProject