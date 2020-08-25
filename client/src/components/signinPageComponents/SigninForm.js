import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../actions';
import { getProjects } from '../../actions/project';
import { getUser, setUser, authenticate, getUserInfos, setUserInfos } from '../../actions/user';
import { useHistory, Redirect, Link } from "react-router-dom";
import Alert from '../Layout/Alert.js'


const SigninForm = (props) => {
    const [remember, setRemember] = useState(false)
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
    });
    const { email, password } = values;
    const authUser = useSelector(state => state.authUser);
    const history = useHistory();
    const dispatch = useDispatch();


    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const handleRememberCheck = () => {
        setRemember(!remember)
        console.log(remember)
    }

    const clickSubmit = event => {
        event.preventDefault();
        getUser({ email, password })
            .then(data => {
                if (data.err) {
                    dispatch(setAlert("L'identifiant ou le mot de passe n'est pas reconnu", "danger"))
                }
                else {
                    console.log(data)
                    if (data.user.confirmed===false) {
                        dispatch(setAlert(`Votre email n'a pas été confirmé, rendez vous sur la boite de ${data.user.email}`,"danger"))
                    } else {
                        authenticate(data, remember)
                        getUserInfos(JSON.parse(sessionStorage.getItem('jwt')).user._id).then(user => {
                            console.log(user)
                            dispatch(setUser())
                            dispatch(setUserInfos(user))
                            if (user.projectsId) {
                                user.projectsId.forEach(projectItem => {
                                    dispatch(getProjects(projectItem))
                                })
                            }
                            history.push("/")
                            dispatch(setAlert("Vous êtes connecté", "success"))


                        })
                    }


                }

                /* if (localStorage.getItem('jwt')) {
                    getUserInfos(JSON.parse(localStorage.getItem('jwt')).user._id).then(user => {
                        console.log(user)
                        dispatch(setUserInfos(user))
                        if (user.projectsId) {
                            user.projectsId.forEach(projectItem => {
                                dispatch(getProjects(projectItem))
                            })
                        }
                    })
                } */
            }
            )


    };

    if (sessionStorage.getItem('jwt')) {
        return (
            <Redirect to={"/"} />
        )
    } else {
        return (
            <div className="row mt-5 mt-md-0 h-100 justify-content-center text-center bg-orange d-flex align-items-center">
                <form className='col-12 col-md-4'>
                    <h2>Connexion</h2>
                    <div className="form-group">
                        <label className="text-muted">
                            Email
                </label>
                        <input value={email} onChange={handleChange('email')} type="email" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Password
                </label>
                        <input value={password} onChange={handleChange('password')} type="password" className="form-control" />
                    </div>
                    <div className="row p-0 m-0 align-items-center justify-content-between">
                        <div className="form-check text-left mb-2 col-6 m-0">
                            <input className="form-check-input" onClick={handleRememberCheck} type="checkbox" id="defaultCheck1" />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Se souvenir de moi
                            </label>
                        </div>
                        <div className="col-6 text-right px-0">
                            <button onClick={clickSubmit} className="btn btn-primary">Se Connecter</button>
                        </div>
                    </div>
                    <Alert />
                    <div className=" d-flex align-items-center">

                        <Link to="/signup" className="text-dark mx-auto mt-2 mt-md-4">Pas encore inscrit?</Link>
                    </div>

                </form>
            </div >
        )
    }
}

export default SigninForm