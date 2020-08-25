import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Accordion, Card, Button, Modal } from 'react-bootstrap';
import { setTimeLeft } from './TLFunctions'
import TodoColorFieldset from '../Layout/TodoColorFieldset'
import AddSubtask from './addSubtask'
import {
    setTodoItem,
    updateTodoCategory,
    clearTodos,
    supressTodoById,
    setTodosByProjectId,
    clearTodosId,
    setAlert,
    setSubtasks,
    setSelectedTodo,
    clearSubtasks
} from '../../actions'
import { deleteTodoFromRepo } from '../../actions/project'
import moment from 'moment'
import 'moment/locale/fr'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

const TLCols = () => {
    moment.locale('fr');
    const [showSupress, setShowSupress] = useState(false);
    const dispatch = useDispatch()
    const todosId = useSelector((state) => state.todosId)
    const todos = useSelector((state) => state.todos)
    const subtasks = useSelector((state) => state.subtasks)

    const init = () => {
        dispatch(clearTodos())
        sessionStorage.removeItem("selectedTodo")
        if (todosId.length) {
            todosId.forEach(todoItem => {
                dispatch(setTodoItem(todoItem))
            }
            )
        }
        /* if (todos.length) {
            todos.forEach(todo => {

                setTimeLeft(todo.dead_line, now)
            })
        } */

    }
    useEffect(() => {
        init();
    }, [])

    const now = new Date()
    const pushToProd = e => {
        e.preventDefault();
        const prodId = {
            category: "5f198a112dc01108b89f3607"
        }
        updateTodoCategory(e.target.id, prodId).then(() => {
            dispatch(clearTodos())
            init()
        })
    }
    const pushToEnd = e => {
        e.preventDefault();
        const prodId = {
            category: "5f198a202dc01108b89f3608"
        }
        updateTodoCategory(e.target.id, prodId).then(() => {
            dispatch(clearTodos())
            init()
        })
    }
    const pushToNever = e => {
        e.preventDefault();
        const prodId = {
            category: "5f1989f72dc01108b89f3605"
        }
        updateTodoCategory(e.target.id, prodId).then(() => {
            dispatch(clearTodos())

            init()
        })
    }
    const handleCloseSupress = () => setShowSupress(false);
    const handleShowSupress = () => setShowSupress(true);


    const rule = (t) => {
        return moment(t.dead_line).diff(moment(now), 'days') < 4
    }

    const supressTodo = todoToSupressId => e => {
        e.preventDefault();
        if (sessionStorage.getItem('jwt')) {
            supressTodoById(todoToSupressId, JSON.parse(sessionStorage.getItem('jwt')).token, JSON.parse(sessionStorage.getItem('jwt')).user._id).then((response) => {
                deleteTodoFromRepo(JSON.parse(sessionStorage.getItem('selectedProjectId')), response).then(() => {
                    dispatch(clearTodos())
                    dispatch(clearTodosId())
                    dispatch(setTodosByProjectId(JSON.parse(sessionStorage.getItem('selectedProjectId'))))
                    dispatch(setAlert("Tâche supprimée", "danger"))

                })

            })
        }
        if (localStorage.getItem('jwt')) {
            supressTodoById(todoToSupressId, JSON.parse(localStorage.getItem('jwt')).token, JSON.parse(localStorage.getItem('jwt')).user._id).then((response) => {
                deleteTodoFromRepo(JSON.parse(localStorage.getItem('selectedProjectId')), response).then(() => {
                    dispatch(clearTodos())
                    dispatch(clearTodosId())
                    dispatch(setTodosByProjectId(JSON.parse(localStorage.getItem('selectedProjectId'))))
                    dispatch(setAlert("Tâche supprimée", "danger"))

                })

            })
        }


    }

    const handleOnClick = e => {
        e.preventDefault();
        dispatch(clearSubtasks())
        console.log(e.target.id)
        console.log("prout dans ta mère")
        sessionStorage.setItem("selectedTodo", e.target.id)
        if (sessionStorage.getItem("selectedTodo")) {
            dispatch(setSelectedTodo(e.target.id))
        }
    }

    return (
        <Fragment>
            <div className="row w-100 text-center mx-auto mt-5 todoTitleFont" style={{ paddingBottom: "100px" }}>
                <div className="col-4 text-dark border-right p-2">
                    <h3>A Faire</h3>
                    {todos.map((t, i) => {
                        return (
                            todosId.length && t.category === "5f1989f72dc01108b89f3605" ? (

                                <div
                                    className="card p-0 mb-2 todo-card "
                                    key={i}
                                    style={{
                                        border: rule(t) ? "1px solid red" : "",
                                        color: "black"
                                    }}
                                >
                                    <div className="col-12 text-right p-0">



                                        <Button variant="white" onClick={handleShowSupress} style={{
                                            fontSize: "0.8em",
                                            borderTopLeftRadius: "0px",
                                            borderBottomLeftRadius: "0px",
                                            borderBottomRightRadius: "0px"
                                        }}
                                            className=" col-1 mt-0 ml-auto border-0"
                                        >
                                            x
      </Button>

                                        <Modal show={showSupress} onHide={handleCloseSupress}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>{t.title}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Êtes vous sur de vouloir supprimer cette tâche?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseSupress}>
                                                    Non
          </Button>
                                                <Button variant="danger" onClick={supressTodo(t._id)}>
                                                    Oui, supprimer
          </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>

                                    <h5 className="card-title m-0">{t.title}</h5>
                                    {/* <Accordion>
                                        <Card className="border-0">
                                            
                                                
                                                    <Accordion.Toggle as={Card.Header}  onClick={handleOnClick} id={t._id} eventKey="0">
                                                        Sous-tâches <i className="far fa-caret-square-down"></i>
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body className="text-left">{subtasks && subtasks.map((sub, i) => {
                                                            return (
                                                                <div key={i} className=/* {sub.done ? "bg-success border-top py-1 px-2 " :  "border-top py-1 px-2">
                                                                    <p>{sub.content}</p>
                                                                </div>
                                                            )
                                                        })}</Card.Body>
                                                    </Accordion.Collapse>
                                                
                                            <AddSubtask t={t}/>
                                        </Card>
                                    </Accordion> */}

                                    <div className="col-12 d-flex px-1">
                                        {t.dead_line && (
                                            <div className="col-md-10 offset-md-1">
                                                <p className="mt-0  px-2">
                                                    {now && setTimeLeft(t.dead_line, now)}
                                                </p>
                                            </div>
                                        )}
                                        <div className="col-1 p-0 align-items-center d-flex" >
                                            <TodoColorFieldset t={t} />
                                        </div>
                                    </div>
                                    <button
                                        className=" btn btn-primary w-100 p-0 todo-btn-cat"
                                        style={{ fontSize: "0.8em" }}
                                    >
                                        <span className="w-100 d-inline-block" id={t._id} onClick={pushToProd}>Commencer cette tâche</span>

                                    </button>
                                </div>
                            ) : ('')
                        )
                    })}
                </div>
                 <div className="col-4 border-right text-dark p-2">
                    <h3 >En production</h3>
                    {todos.map((t, i) => {
                        return (
                            todosId.length && t.category === "5f198a112dc01108b89f3607" ? (
                                <div
                                    style={{
                                        border: rule(t) ? "2px solid red" : "",
                                        color: "black"
                                    }}
                                    className="card mb-2 p-0 todo-card"
                                    key={i}
                                >
                                    <div className="col-12 text-right p-0">
                                        <Button variant="white" onClick={handleShowSupress} style={{
                                            fontSize: "0.8em",
                                            borderTopLeftRadius: "0px",
                                            borderBottomLeftRadius: "0px",
                                            borderBottomRightRadius: "0px"
                                        }}
                                            className=" col-1 mt-0 ml-auto border-0"
                                        >
                                            x
      </Button>

                                        <Modal show={showSupress} onHide={handleCloseSupress}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>{t.title}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Êtes vous sur de vouloir supprimer cette tâche?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseSupress}>
                                                    Non
          </Button>
                                                <Button variant="danger" onClick={supressTodo(t._id)}>
                                                    Oui, supprimer
          </Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </div>

                                    <h5 className="card-title m-0">{t.title}</h5>
                                    {/*<Accordion>
                                        <Card className={`border-0`}>
                                            {t.length && (
                                                <Fragment>
                                                    <CustomToggle eventKey="0">
                                                        Sous-tâches <i className="far fa-caret-square-down"></i>
                                                    </CustomToggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <Card.Body className="text-left">{t.subTask && t.subTask.map((sub, i) => {
                                                            return (
                                                                <div key={i} className={sub.done ? "bg-success border-top py-1 px-2 " : "border-top py-1 px-2"}>
                                                                    <p  className="pt-1">{sub.content}</p>
                                                                </div>
                                                            )
                                                        })}</Card.Body>
                                                    </Accordion.Collapse>
                                                </Fragment>
                                            )}
                                            <AddSubtask t={t}/>
                                        </Card>
                                    </Accordion>*/}
                                    <div className="col-12 d-flex px-1">
                                        {t.dead_line && (
                                            <div className="col-md-10 offset-md-1">
                                                <p className="mt-0  px-2">
                                                    {now && setTimeLeft(t.dead_line, now)}
                                                </p>
                                            </div>
                                        )}
                                        <div className="col-1 p-0 align-items-center d-flex" >
                                            <TodoColorFieldset t={t} />
                                        </div>
                                    </div>

                                    <div className="d-flex">
                                        <button
                                            className="btn btn-secondary col p-0 todo-btn-cat"
                                            style={{
                                                fontSize: "0.8em",
                                                borderBottomRightRadius: "0px",
                                                borderBottomLeftRadius: "3px"
                                            }}
                                        >
                                            <span id={t._id} onClick={pushToNever} className="d-inline-block w-100">Reporter</span>
                                        </button>
                                        <button
                                            className="btn btn-success col p-0 todo-btn-cat"
                                            style={{
                                                fontSize: "0.8em",
                                                borderBottomLeftRadius: "0px",
                                                borderBottomRightRadius: "3px"
                                            }}
                                        >
                                            <span id={t._id} className="d-inline-block w-100" onClick={pushToEnd}>Tâche terminée</span>
                                        </button>
                                    </div>
                                </div>
                            ) : ('')
                        )
                    })}
                </div>
                <div className="col-4 text-dark p-2">
                    <h3>Fini!</h3>
                    {todos.map((t, i) => {
                        return (
                            todosId.length && t.category === "5f198a202dc01108b89f3608" ? (
                                <div
                                    style={{ backgroundColor: "#cdf7d6" }}
                                    className="card mb-2 p-0 text-dark border-0 todo-card "
                                    key={i}
                                >
                                    <h5 className="card-title m-0 mb-0 mt-2">
                                        {t.title}
                                    </h5>
                                    {/* <Accordion style={{ backgroundColor: "#cdf7d6" }}>
                                        <Card className="border-0" style={{ backgroundColor: "#cdf7d6" }}>
                                            {t.length !== 0 && (
                                                <Fragment>
                                                    <CustomToggle eventKey="0">
                                                        Sous-tâches <i className="far fa-caret-square-down"></i>
                                                    </CustomToggle>
                                                    <Accordion.Collapse eventKey="0" >
                                                        <Card.Body className="text-left">{t.subTask && t.subTask.map((sub, i) => {
                                                            return (
                                                                <div key={i} className={sub.done ? "bg-success border-top py-1 px-2 " : "border-top py-1 px-2"}>
                                                                    <p className="pt-1">{sub.content}</p>
                                                                </div>
                                                            )
                                                        })}</Card.Body>
                                                    </Accordion.Collapse>
                                                </Fragment>
                                            )}
                                        </Card>
                                    </Accordion> */}
                                    <i className="far fa-check-square ml-auto mr-1 mb-1 fa-2x text-primary" title="Tâche terminée" ></i>
                                    <button
                                        className="btn btn-warning w-100 p-0 todo-btn-cat"
                                        style={{ fontSize: "0.8em" }}
                                    >
                                        <span id={t._id}
                                            onClick={pushToProd}
                                            className="w-100 d-inline-block">
                                            Revenir à cette tâche
                                            </span>

                                    </button>
                                </div>
                            ) : ('')
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default TLCols