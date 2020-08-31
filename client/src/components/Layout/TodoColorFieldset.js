import React, { useState, Fragment } from 'react'
import { Modal, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
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
    const [radioValue, setRadioValue] = useState("")

    const handleCloseParams = () => setShowParams(false);
    const handleShowParams = () => setShowParams(true);
    const radios = [
        { name: '#ffffff', value: '#ffffff', color: "#ffffff" },
        { name: '#fad000', value: '#fad000', color: "#fad000" },
        { name: '#FF9933', value: '#FF9933', color: "#FF9933" },
        { name: '#DB4035', value: '#DB4035', color: "#DB4035" },
        { name: '#B8255F', value: '#B8255F', color: "#B8255F" },
        { name: '#884DFF', value: '#884DFF', color: "#884DFF" },
        { name: '#14AAF5', value: '#14AAF5', color: "#14AAF5" },
        { name: '#299438', value: '#299438', color: "#299438" },
    ];

    /* const color = (bg) => {
        console.log(bg)
        if (bg = "#FFFFFF") {
            return true
        } else {
            return false
        }

    } */
    const handleTodoBgColor = e => {
        if (sessionStorage.getItem('jwt')) {
            const bgRadio = {
                bgColor: radioValue
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
                    style={{ backgroundColor: `${props.t.bgColor}`, border: props.t.bgColor === "#FFFFFF" ? "1px solid black" : "" }}
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
                    <div className="row text-center mx-auto">
                        <h3 className="col-12">Choisissez une couleur de pastille:</h3>
                        <ButtonGroup toggle vertical className="col-12 col-md-6 mx-auto">
                            {radios.map((radio, idx) => (
                                <ToggleButton
                                    key={idx}
                                    type="radio"
                                    /* variant={radio.variant} */
                                    name="radio"
                                    style={{ backgroundColor: `${radio.color}` }}
                                    value={radio.value}
                                    checked={radioValue === radio.value}
                                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                                    className="py-3 "
                                >

                                </ToggleButton>
                            ))}


                        </ButtonGroup>
                    </div>
                    {radioValue && radioValue !== "" ? (
                        <div className="col-12 col-md-6 mx-auto text-center">
                            <p>Couleur choisie:</p>
                            <div className="w-100 py-3 rounded" style={{ backgroundColor: `${radioValue}` }}>
                            </div>
                        </div>
                    ) : ("")}

                </Modal.Body>
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