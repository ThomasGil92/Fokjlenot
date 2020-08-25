import React, { useState, Fragment } from 'react'
import { setAlert, supressTodoById } from '../../actions'
import { suppressProjectById, clearProjects, getProjects } from '../../actions/project'
import { getUserInfos, setUserInfos, deleteProjectFromRepo } from '../../actions/user'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

const RemoveProjectButton = () => {
    const [show, setShow] = useState(false);
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch()
    const history = useHistory()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const suppressProject = e => {
        e.preventDefault();
        suppressProjectById(JSON.parse(sessionStorage.getItem('selectedProjectId')), JSON.parse(sessionStorage.getItem('jwt')).token, JSON.parse(sessionStorage.getItem('jwt')).user._id).then((response) => {
            console.log(response)
            todos.forEach((todo => {
                supressTodoById(todo._id, JSON.parse(sessionStorage.getItem('jwt')).token, JSON.parse(sessionStorage.getItem('jwt')).user._id)
            }))
            deleteProjectFromRepo(JSON.parse(sessionStorage.getItem('jwt')).user._id, response).then(data => {

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
                dispatch(setAlert("Le projet a bien été supprimé", "success"))

                history.push("/")

            })
        })
    }

    return (
        <Fragment>
            {/* <button
                className="btn btn-outline-danger mt-5"
                data-toggle="modal"
                data-target="#exampleModal">
                Supprimer ce projet <i className="fas fa-trash-alt"></i>
            </button>
            <div className="modal fade text-dark" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                             <h5 className="modal-title" id="exampleModalLabel">{t.title}</h5> 
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Êtes vous sûr de vouloir supprimer ce projet définitivement? Vous ne pourrez plus faire marche arrière. Je vous aurais prévenu!
      </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Non</button>
                            <button type="button" onClick={suppressProject} data-dismiss="modal" className="btn btn-primary">Oui, supprimer</button>
                        </div>
                    </div>
                </div>
            </div> */}
            <Button variant="white" onClick={handleShow} className="btn btn-outline-danger d-block col-12 col-md-4  mt-1 mt-md-0 todoTitleFont">
                Supprimer ce projet <i className="fas fa-trash-alt"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>Êtes vous sur de vouloir supprimer ce projet définitivement?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Non
          </Button>
                    <Button variant="danger" onClick={suppressProject}>
                        Oui, supprimer
          </Button>
                </Modal.Footer>
            </Modal>

        </Fragment>

    )
}

export default RemoveProjectButton