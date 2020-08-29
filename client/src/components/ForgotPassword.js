import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { postEmailPassword } from '../actions/email'
import { setAlert } from '../actions'

import Alert from './Layout/Alert'
import HomeMenu from './HomePageComponents/HomeMenu'
import Footer from './Layout/Footer'
import Cookie from './Layout/Cookie'

const ForgotPassword = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState({
        email: ""
    })

    const handleChange = e => {
        const value = e.target.value;
        setEmail({ ...email, [e.target.name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        postEmailPassword(email)
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    dispatch(setAlert(`Le mail de renouvellement de mot de passe a bien été envoyé à l'adresse ${data.email}, vérifiez vos spams`, "success"))
                    history.push("/landing")
                }
            })
    }
    return (
        <div className="container-fluid vh-100 d-flex align-items-center text-fokjlenot">
            <Footer anchor={"#homeTop"} />
            <HomeMenu />
            <Alert />
            <Cookie />
            <div className="row vw-100 pt-5 mt-5 ">
                <div id="ForgotPassword" className="col-12 col-md-4 card mx-auto bg-orange border-0" >
                    
                    <div className="card-body">
                        <h4 className="card-title mb-4 text-center">Changer de mot de passe</h4>
                        <form>
                            <div className="form-group mb-4">
                                <input type="text" name="email" required value={email.email} onChange={handleChange} className="form-control" placeholder="Votre adresse email" />
                            </div>
                            <div className="px-0">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary col-12">
                                    Envoyer le mail de renouvellement de mot de passe
                                    </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword