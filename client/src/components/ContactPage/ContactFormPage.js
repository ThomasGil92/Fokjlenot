import React, { Fragment } from 'react'
import ContactForm from './ContactForm'
import HomeMenu from '../HomePageComponents/HomeMenu'
import Footer from '../Layout/Footer'

const ContactFormPage = () => {
    return (
        <Fragment>
            <div className="container-fluid">
                <HomeMenu />
                <ContactForm />
                <Footer anchor={"#homeTop"} />
            </div>

        </Fragment>

    )
}

export default ContactFormPage