import React, { useState, Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { postSubtask } from '../../actions'

const AddSubtask = (props) => {
    const [showAddSubtask, setShowAddSubtask] = useState(false)
    const [subTask, setFields] = useState({
        content: "",
        done: false
    })

    const handleShowAddSubtask = () => setShowAddSubtask(true);
    const handleCloseAddSubtask = () => setShowAddSubtask(false);
    const handleChange = e => {
        const value = e.target.value;
        setFields({ ...subTask, [e.target.name]: value });
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(subTask)
        postSubtask(subTask)
        .then(response => {
            if (response.err) {
                console.log(response.err)
            } else {
                /* putSubtaskIdInTodoList(response._id,) */
                setShowAddSubtask(false)
            }
        })
    }
    return (
        <Fragment>
            <Button variant="white" onClick={handleShowAddSubtask} style={{
                fontSize: "0.8em"
            }}
                className=""
            >
                + Ajouter une sous-tâche
</Button>

            <Modal show={showAddSubtask} onHide={handleCloseAddSubtask}>
                <Modal.Header closeButton>
                    <Modal.Title>Quelle sous-tâche ajouter ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group mb-4">
                            <input type="text" name="content" required value={subTask.content} onChange={handleChange} className="form-control" placeholder="Nom de la sous-tâche" />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={handleCloseAddSubtask}>
                        Annuler
</Button>
                    <Button variant="outline-primary" onClick={handleSubmit}>
                        Ajouter cette sous-tâche
</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>

    )
}

export default AddSubtask