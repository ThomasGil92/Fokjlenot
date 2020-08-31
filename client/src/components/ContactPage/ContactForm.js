import React from 'react'
import emailjs from 'emailjs-com';
import { useHistory } from 'react-router-dom'
import { setAlert } from '../../actions'
import { useDispatch } from 'react-redux'


const ContactForm = () => {
    const dispatch = useDispatch()
    const history = useHistory()
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
        <div className="row d-flex justify-content-center mt-5 pt-5">
            <div className="col-12 col-md-5 pt-md-4">
                <h3 className="text-center">N'hésitez pas à me contacter si vous avez des questions.</h3>
                <form
                    onSubmit={sendEmail}
                    id="contactForm"
                    className="  mx-auto mt-4 row"
                >
                        <label className="lead d-block">Votre nom:</label>
                        <input
                            type="text"
                            name="user_name"
                            required
                            minLength="3"
                            maxLength="40"
                            className="w-100"
                        />
                    
                        <label className="lead mt-1 d-block">Votre adresse email:</label>
                        <input
                            type="email"
                            name="user_email"
                            required
                            maxLength="40"
                            className="w-100"
                        />
                    
                    <label className="lead d-block">Votre message:</label>
                    <textarea
                        name="message"
                        minLength="10"
                        maxLength="2000"
                        rows="4"
                        className="w-100"
                        required />
                    <button
                        className="btn d-block btn-outline-dark w-100 mt-4"
                        type="submit"

                    >
                        Envoyer le message
                    </button>


                </form>

            </div>

        </div>
    )
}

export default ContactForm