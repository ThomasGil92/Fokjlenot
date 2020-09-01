import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../actions';
import { postUser } from '../../actions/user';
import { postEmailConf } from '../../actions/email';
import { useHistory, Redirect, Link } from "react-router-dom";
import Alert from '../Layout/Alert.js'
import Recaptcha from 'react-recaptcha'

const SignupForm = (props) => {
    const [sendingEmail, setSendingEmail] = useState(false)
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [verify, setVerify] = useState(false)
    const { name, email, password } = values;
    const authUser = useSelector(state => state.authUser);
    const history = useHistory();
    const dispatch = useDispatch();


    var callback = function () {
        console.log('Done!!!!');
    };

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };
    const recaptchaLoaded = () => {
        console.log("loaded captcha")
    }
    const verifyCallback = (response) => {
        if (response) {
            setVerify(true)
        }
    }
    const clickSubmit = event => {

        event.preventDefault()

        setValues({ ...values, error: false, loading: true });
        if (verify) {
            postUser({ name, email, password })
                .then(data => {
                    if (data.error) {
                        dispatch(setAlert("Une erreur est survenue", "danger"))
                    } else {
                        postEmailConf({ email })
                            .then(data => {
                                setSendingEmail(false)
                                console.log(data)
                                dispatch(setAlert(`Votre compte a bien été créé, ${data.msg}`, "success"))
                                history.push("/signin")
                            })
                            .catch(err => console.log(err))
                    }
                }

                )

        } else {
            alert("you're not human")
        }
    };

    if (sessionStorage.getItem('jwt')) {
        return (
            <Redirect to={"/"} />
        )
    } else {
        return (
            <div className="row mt-5 mt-md-0 m-0 h-100 justify-content-center text-center bg-orange d-flex align-items-center">
                <form className='col-12 col-md-4'>
                    <h2>Créer un compte</h2>
                    <div className="form-group">
                        <label className="text-muted">
                            Nom
                </label>
                        <input value={name} onChange={handleChange('name')} type="name" required className="form-control" />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">
                            Email
                </label>
                        <input value={email} onChange={handleChange('email')} required type="email" className="form-control" />
                    </div>
                    <div className="form-group text-left">
                        <label className="text-muted">
                            Mot de passe
                </label>
                        <input value={password} onChange={handleChange('password')} required type="password" className="form-control" />
                    </div>
                    {/* <ReCAPTCHA
                        sitekey="6LcBysEZAAAAALMjFzeeHQo1lsIqf5cmN3feLRhU-d0"
                        onChange={onChange}
                    /> */}
                    <Recaptcha
                        sitekey="6LcBysEZAAAAALMjFzeeHQo1lsIqf5cmN3feLRhU"
                        render="explicit"
                        onloadCallback={recaptchaLoaded}
                        verifyCallback={verifyCallback}
                    />
                    <Alert />
                    <div className="justify-content-between mt-3 d-flex align-items-center">
                        <button onClick={clickSubmit} className="btn btn-primary">Créer un compte</button>
                        <Link to="/signin" className="text-dark">Déja inscrit?</Link>
                    </div>

                </form>
            </div>
        )
    }
}

export default SignupForm