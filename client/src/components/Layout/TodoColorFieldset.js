import React, { useState, Fragment } from 'react'
import { Modal, Form, Col, Row, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux'
import {
    updateTodoBgColor,
    clearTodos,
    setTodosByProjectId,
    setAlert,
    clearTodosId
} from '../../actions'

const TodoColorFieldset = props => {
    const dispatch = useDispatch()
    const [showParams, setShowParams] = useState(false);
    const [checkedRadio, setCheckedRadio] = useState("")

    const handleCloseParams = () => setShowParams(false);
    const handleShowParams = () => setShowParams(true);

    const handleCheck = e => {
        setCheckedRadio(e.target.name)
    }
const color=(bg)=>{
    console.log(bg)
        if(bg="#FFFFFF"){
            return true
        }else{
            return false
        }
    
}
    const handleTodoBgColor = e => {
        if (sessionStorage.getItem('jwt')) {
            const bgRadio = {
                bgColor: checkedRadio
            }
            updateTodoBgColor(e.target.id, bgRadio)
                .then((response) => {
                    console.log(response)
                    dispatch(clearTodos())
                    dispatch(clearTodosId())
                    dispatch(setTodosByProjectId(JSON.parse(sessionStorage.getItem('selectedProjectId'))))
                    dispatch(setAlert("Couleur de pastille modifiée", "success"))
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    return (
        <Fragment>
            <div>
                <button
                    style={{ backgroundColor: `${props.t.bgColor}`, border: props.t.bgColor==="#FFFFFF"?"1px solid black":"" }}
                    onClick={handleShowParams}
                    className="btn btn-default"
                    title="Changer de couleur de pastille"
                >
                </button>
            </div>


            <Modal show={showParams} onHide={handleCloseParams}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <fieldset>
                        <Form.Group as={Row}>
                            <Col sm={10} className="mx-auto">
                                <div className="text-center">
                                    <h3>Couleur de la pastille:</h3>
                                </div>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        checked={checkedRadio === '#ffffff'}
                                        onChange={handleCheck}
                                        aria-label="first0 radio"
                                        name="#ffffff"
                                        id="formHorizontalRadios0"
                                    />
                                    <div
                                        className="h-100 w-100"
                                        style={{ backgroundColor: "#ffffff", color: "#ffffff" }}>.
                            </div>
                                </div>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        checked={checkedRadio === '#fad000'}
                                        onChange={handleCheck}
                                        aria-label="first radio"
                                        name="#fad000"
                                        id="formHorizontalRadios1"
                                    />
                                    <div
                                        className="h-100 w-100"
                                        style={{ backgroundColor: "#fad000", color: "#fad000" }}>.
                            </div>
                                </div>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        checked={checkedRadio === '#FF9933'}
                                        onChange={handleCheck}
                                        aria-label="second radio"
                                        name="#FF9933"
                                        id="formHorizontalRadios2"
                                    />
                                    <div
                                        className="h-100 w-100"
                                        style={{ backgroundColor: "#FF9933", color: "#FF9933" }}>.
                    </div>
                                </div>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        checked={checkedRadio === '#DB4035'}
                                        onChange={handleCheck}
                                        aria-label="third radio"
                                        name="#DB4035"
                                        id="formHorizontalRadios3"
                                    />
                                    <div
                                        className="h-100 w-100"
                                        style={{ backgroundColor: "#DB4035", color: "#DB4035" }}>.
                        </div>
                                </div>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        checked={checkedRadio === '#B8255F'}
                                        onChange={handleCheck}
                                        aria-label="fourth radio"
                                        name="#B8255F"
                                        id="formHorizontalRadios4"
                                    />
                                    <div
                                        className="h-100 w-100"
                                        style={{ backgroundColor: "#B8255F", color: "#B8255F" }}>.
                        </div>
                                </div>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        checked={checkedRadio === '#884DFF'}
                                        onChange={handleCheck}
                                        aria-label="fifth radio"
                                        name="#884DFF"
                                        id="formHorizontalRadios5"
                                    />
                                    <div
                                        className="h-100 w-100"
                                        style={{ backgroundColor: "#884DFF", color: "#884DFF" }}>.
                        </div>
                                </div>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        checked={checkedRadio === '#14AAF5'}
                                        onChange={handleCheck}
                                        aria-label="sixth radio"
                                        name="#14AAF5"
                                        id="formHorizontalRadios6"
                                    />
                                    <div
                                        className="h-100 w-100"
                                        style={{ backgroundColor: "#14AAF5", color: "#14AAF5" }}>.
                        </div>
                                </div>
                                <div className="d-flex">
                                    <Form.Check
                                        type="radio"
                                        checked={checkedRadio === '#299438'}
                                        onChange={handleCheck}
                                        aria-label="seventh radio"
                                        name="#299438"
                                        id="formHorizontalRadios7"
                                    />
                                    <div
                                        className="h-100 w-100"
                                        style={{ backgroundColor: "#299438", color: "#299438" }}>.
                        </div>
                                </div>
                            </Col>
                        </Form.Group>

                    </fieldset></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseParams}>
                        Non
          </Button>

                    <button className="btn btn-danger" id={props.t._id} onClick={handleTodoBgColor}>
                        Appliquer les changements ...
                        </button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default TodoColorFieldset