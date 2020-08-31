import React from 'react'
import {Link}from 'react-router-dom'

const SignupMenu = () => {
    return (
        <nav id="signupTop" className="navbar navbar-light d-flex justify-content-between text-center position-absolute w-100 bg-orange" style={{ left:"0",top:'0',zIndex:"10",boxShadow:"0px 0px 20px black" }}>
            <div className="d-none d-md-block col-md-2">
                <p className="text-dark mb-0 py-1 mx-auto " >bêta V1.0</p>
            </div>
            <div className="col-12 col-md-8">
                <h1 className="text-white mb-0 py-1 mx-auto "><Link className="navbar-brand mySpecialFont" to={"/"}>Fokjlenot</Link></h1>
            </div>
            {/* <div className="col-8 mx-auto col-md-2">
                <Link to={"/signin"} className="btn btn-outline-dark mb-0 py-1 mx-auto" >Se connecter</Link>
            </div> */}


        </nav>
    )
}


export default SignupMenu