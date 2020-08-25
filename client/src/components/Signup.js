import React, { Fragment } from 'react'
import SignupMenu from './signupPageComponents/SignupMenu'
import SignupForm from './signupPageComponents/SignupForm'
import Cookie from './Layout/Cookie'
import Footer from './Layout/Footer'

const Signup = () => {
    return (
        <div className="container-fluid vh-100">
            <SignupMenu />
            <SignupForm />
            <Footer anchor={"#signupTop"}/>
            <Cookie />
        </div>
    )
}

export default Signup