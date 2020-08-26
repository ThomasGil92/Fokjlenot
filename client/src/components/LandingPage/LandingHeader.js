import React from 'react'
import { Link } from 'react-router-dom'

const LandingHeader = () => {
    return (
        <div
        id="landing-header"
            className="row d-flex align-items-center justify-content-center text-center"
            style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(img/landingHeader.jpg)`,
            }}>
            <div className="col-12 col-md-6 ">
                <p className="lead pt-5 mt-5 mb-3" style={{fontSize:"1.1em"}}>L'essentiel pour la gestion de vos projets</p>
                <Link to={"/signup"} className="btn btn-primary mb-3" style={{fontSize:"1.1em"}}>S'inscrire</Link>
            </div>
        </div>
    )
}

export default LandingHeader