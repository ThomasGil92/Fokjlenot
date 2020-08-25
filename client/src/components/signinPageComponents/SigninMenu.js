import React from 'react'
import {Link}from 'react-router-dom'

const SigninMenu = () => {
    return (
        <nav id="signinTop" className="navbar navbar-light d-flex justify-content-between text-center position-absolute w-100 bg-orange" style={{ left:"0",top:'0',zIndex:"10",boxShadow:"0px 0px 20px black" }}>
            <div className="col-md-2">
                <p className="text-dark mb-0 py-1 mx-auto " >bêta V1.0</p>
            </div>
            <div className="col-md-8">
                <h1 className="text-white mb-0 py-1 mx-auto "><Link className="navbar-brand mySpecialFont" to={"/"}>Fokjlenot</Link></h1>
            </div>
            <div className="col-md-2">
                <Link to={"/signup"} className="btn btn-outline-dark mb-0 py-1 mx-auto" >Créer un compte</Link>
            </div>


        </nav>
    )
}


export default SigninMenu