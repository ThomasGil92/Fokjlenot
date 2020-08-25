import React, { Fragment } from 'react'
import SigninMenu from './signinPageComponents/SigninMenu'
import SigninForm from './signinPageComponents/SigninForm'
import Cookie from './Layout/Cookie'
import Footer from './Layout/Footer'

const Signin = () => {
    return (
        <div className="container-fluid vh-100">
            <SigninMenu />
            <SigninForm />
            <Footer anchor={"#signinTop"}/>
            <Cookie />
        </div>
    )
}

export default Signin