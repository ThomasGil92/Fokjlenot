import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setAlert} from '../actions'
import { API } from '../config'

const Confirm = (props) => {
    const [confirming, setConfirming] = useState(true)
    const dispatch=useDispatch()
    const init = () => {
        const { id } = props.match.params;
        fetch(`${API}/email/confirm/${id}`)
            .then(res => res.json())
            .then(data => {
                setConfirming(false)
                window.location = "https://fokjlenot.herokuapp.com/"
                dispatch(setAlert(data.msg))
            })
            .catch(err => {
                dispatch(setAlert("Une erreur est survenue, veuillez recommencer","danger"))
                console.log(err)})
    }

    useEffect(() => {
        init()
    }, [])


    return (
        <div className="container-fluid vh-100 bg-primary">
            <div className='row h-100 d-flex align-item-center justify-content-center'>
                <div className="col-md-12 text-center text-white">
                    {confirming && <p>"Vérification du compte ..."</p>}
                </div>

            </div>
        </div>

    )

}

export default Confirm