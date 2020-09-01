import React, { Fragment } from 'react'
import emailjs from 'emailjs-com';
import { setAlert } from '../../actions'
import { useDispatch } from 'react-redux'

const ContactForm = () => {
    const dispatch = useDispatch()
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('gmail', 'ContactUs', e.target, 'user_4OCMAoXXWlSfnD7fgLVEP')
            .then((result) => {
                console.log(result.text);
                document.getElementById("contactForm").reset();
                dispatch(setAlert("Votre message à bien été envoyé", "info"))

            }, (error) => {
                console.log(error.text);
                dispatch(setAlert("Une erreur est survenue", "danger"))
            })
    };
    return (
        <Fragment>
            <div className="col-12 pt-5 mt-md-5 mb-5 pb-5 border-top bg-light ">
                <h3 className="text-center">Une question? Une suggestion? Votre avis m'intéresse!</h3>
                <form
                    onSubmit={sendEmail}
                    id="contactForm"
                    className=" d-flex justify-content-center mx-auto mt-4 row"

                >
                    <div className="col-md-5">
                        <div>
                            <label className="lead d-block">Votre nom:</label>
                            <input
                                type="text"
                                name="user_name"
                                required
                                minLength="3"
                                maxLength="40"
                                className="w-100"
                            />
                        </div>
                        <div>
                            <label className="lead mt-1 d-block">Votre adresse email:</label>
                            <input
                                type="email"
                                name="user_email"
                                required
                                maxLength="40"
                                className="w-100"
                            />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <label className="lead d-block">Votre message:</label>
                        <textarea
                            name="message"
                            minLength="10"
                            maxLength="2000"
                            rows="4"
                            className="w-100"
                            required />
                        <button
                            className="btn d-block btn-outline-dark ml-auto"
                            type="submit"

                        >
                            Envoyer le message
                    </button>
                    </div>

                </form>

            </div>


        </Fragment>
    );
};

export default ContactForm