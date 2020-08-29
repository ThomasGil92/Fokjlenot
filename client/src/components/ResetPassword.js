import React, { useState, useEffect, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import { getUserByForgotId } from '../actions/email'
import { setAlert } from '../actions'
import { passwordReset } from '../actions/user'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import Alert from './Layout/Alert'
import HomeMenu from './HomePageComponents/HomeMenu'

const ResetPassword = (props) => {
    const [values, setValues] = useState({
        _id: '',
        confirmed: true,
        forgotPassId: "",
        projectsId: [],
        name: "",
        email: "",
        password: '',
        password2: '',
        expireForgotPassId: ''
    });
    const {
        name,
        email,
        _id,
        password,
        password2,
        expireForgotPassId,
        forgotPassId,
        confirmed } = values;
    const now = moment(Date.now())
    const dispatch = useDispatch()
    const history = useHistory()

    const init = () => {
        const forgotId = props.match.params.forgotId
        getUserByForgotId({ forgotId })
            .then(user => {
                if (user !== null) {
                    setValues({
                        ...values,
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        expireForgotPassId: user.expireForgotPassId,
                        forgotPassId: user.forgotPassId,
                        confirmed: user.confirmed
                    })
                } else {
                    dispatch(setAlert("Une erreur est survenue", "danger"))
                    history.push('/landing')
                }


            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        init()
    }, [])

    const expired = (values) => {
        if (moment(values.expireForgotPassId).diff(now, 'ms') < 0) {
            dispatch(setAlert("Le délais pour renouveller votre mot de passe est écoulé, veuillez recommencer", "danger"))
        }
        else {
            return true
        }
    }
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };
    const clickSubmit = e => {
        e.preventDefault()
        if (password === password2) {
            passwordReset(values._id, { name, email, password: password, confirmed, expireForgotPassId: '', forgotPassId: '' }).then(user => {
                if (user.error) {
                    console.log(user.error)
                    dispatch(setAlert("Votre mot de passe doit contenir au moins 6 caractères", "danger"))
                } else {
                    dispatch(setAlert("Votre mot de passe à bien été modifié", "success"))
                    history.push("/signin")
                }

            })
        } else {
            dispatch(setAlert("Les deux champs de mots de passes doivent être identiques", "danger"))
        }
    }
    return (
        <div className="container-fluid vh-100 ">
            <Alert />
            <HomeMenu />
            <div className="row mt-5 mt-md-0 h-100 justify-content-center text-center bg-orange d-flex align-items-center">
                {values && expired(values) && (
                    <form className='col-12 col-md-4'>

                        <h2>Nouveau mot de passe</h2>
                        <div className="form-group">
                            <label className="text-muted">
                                Nouveau mot de passe
                </label>
                            <input value={password} autoFocus onChange={handleChange('password')} type="password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">
                                Retappez le nouveau mot de passe
                </label>
                            <input value={password2} onChange={handleChange('password2')} type="password" className="form-control" />
                        </div>
                        <div className="px-0 mt-4">
                            <button onClick={clickSubmit} className="btn btn-primary col-12">Changer de mot de passe</button>
                        </div>
                    </form>
                )}

            </div >

        </div>
    )
}

export default ResetPassword