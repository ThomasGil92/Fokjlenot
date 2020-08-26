import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { postTodo, setTodosByProjectId, clearTodosId, setAlert, clearProjects, updateTodoProjectRepo, clearTodos } from '../actions'
import HomeMenu from './HomePageComponents/HomeMenu'
import Cookie from './Layout/Cookie'

const AddTodo = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [todo, setFields] = useState({
        title: '',
        description: '',
        dead_line: ''/* ,
        task_begin: '' */
    })
    /* useEffect(() => {
        if (sessionStorage.getItem('jwt')) {
            getUserInfos(JSON.parse(sessionStorage.getItem("jwt")).user._id)
                .then(data => {
                    dispatch(setUserInfos(data))
                })
                .catch(err => console.log(err))
        }
    }, [getUserInfos]) */

    const handleChange = e => {
        const value = e.target.value;
        setFields({ ...todo, [e.target.name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        /* const userId = JSON.parse(sessionStorage.getItem('jwt')).user._id
        const token = JSON.parse(sessionStorage.getItem('jwt')).token */
        postTodo(JSON.parse(sessionStorage.getItem('jwt')).user._id, JSON.parse(sessionStorage.getItem('jwt')).token, todo)
            .then(data => {
                console.log(data)
                updateTodoProjectRepo(JSON.parse(sessionStorage.getItem('selectedProjectId')), data)
                    .then(() => {
                        dispatch(clearTodosId())
                        dispatch(clearTodos())
                        dispatch(setTodosByProjectId(JSON.parse(sessionStorage.getItem('selectedProjectId'))))

                    })
                    .then(() => {
                        dispatch(setAlert("La tâche a été ajoutée avec succés", "success"))
                        history.push("/todos-list")
                    })

            })
            .catch(function (err) { console.log(err); });
    }
    return (
        <div className="container-fluid vh-100 pt-5 d-flex align-items-center text-fokjleno">
            <HomeMenu />
            <Cookie />
            <div className="row vw-100 mt-5 pt-5">
                <div className="col-12 card border-0 pt-5" >
                    <div className="card-body">
                        <h4 className="card-title mb-4 text-center text-fokjlenot">Nouvelle tâche</h4>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-4">
                                <input type="text" name="title" required value={todo.title} onChange={handleChange} className="form-control" placeholder="Nom de la tâche" />
                            </div>
                            <div className="form-group mb-4">
                                <textarea name="description" type="text" rows="5" value={todo.description} onChange={handleChange} className="form-control" placeholder="Description" />
                            </div>
                            <div className="form-group mb-4">
                                <label >Dead line:</label>
                                <input type="date" name="dead_line" value={todo.dead_line} onChange={handleChange} className="form-control text-muted" placeholder="Date limite" />
                            </div>
                            {/* <div className="form-group mb-4">
                            <label >Début de cette tâche:</label>
                            <input type="date" name="task_begin" value={todo.task_begin} onChange={handleChange} className="form-control text-muted" placeholder="Début" />
                        </div> */}
                            <div>
                                <Link className="col-12 btn btn-outline-info text-center mb-2" to={"/"}><i className="fas fa-angle-double-left mr-1"></i>Revenir à l'accueil</Link>
                                <input type="submit" value="Ajouter cette tâche" className="btn btn-primary col-12" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddTodo