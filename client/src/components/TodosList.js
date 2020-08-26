import React, { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import TLList from './TodosList/TLList'
import HomeMenu from './HomePageComponents/HomeMenu'
import Cookie from './Layout/Cookie'
import RemoveProjectButton from './TodosList/RemoveProjectButton'
import Alert from './Layout/Alert'
import Footer from './Layout/Footer'
import { setTodosByProjectId } from '../actions'
import { setUserInfos, getUserInfos } from '../actions/user'
import TLMenu from './TodosList/TLMenu'
const TodosList = () => {
    const dispatch = useDispatch()
    const todosId = useSelector((state) => state.todosId)
    const user = useSelector((state) => state.user)
    const init = () => {
        dispatch(setTodosByProjectId(JSON.parse(sessionStorage.getItem('selectedProjectId'))))
        // selectedProjectId is recorded in localStorage and sessionStorage
        if (!user.length) {
            if (sessionStorage.getItem("jwt")) {
                getUserInfos(JSON.parse(sessionStorage.getItem("jwt")).user._id)
                    .then(data => {
                        dispatch(setUserInfos(data))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            if (localStorage.getItem("jwt")) {
                getUserInfos(JSON.parse(localStorage.getItem("jwt")).user._id)
                    .then(data => {
                        dispatch(setUserInfos(data))

                    })
                    .catch(err => {
                        console.log(err)
                    })
            }

        }
    }

    useEffect(() => {
        init()
    }, [dispatch])

    return (
        <div className="container-fluid bg-white text-white">
            <HomeMenu />
            <Cookie />
            <Alert />
            {todosId.length ? (
                <TLList />
            ) : (
                    <Fragment>

                        <div className="vh-100 col-12 pt-5">
                            <div className="row pt-4 mt-5 d-flex align-items-center">
                                <TLMenu />
                            </div>
                            <div id="no-tasks-yet" className="mt-5 mt-md-0 d-flex justify-content-center align-items-center" >
                                <p className="lead py-2 card px-4 text-dark text-center h-auto">Aucune tâche n'est encore programmée</p>

                            </div>

                        </div>

                    </Fragment>
                )
            }
            <Footer anchor={"#homeTop"} />
        </div >
    )
}

export default TodosList