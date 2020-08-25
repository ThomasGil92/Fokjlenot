import React from 'react'
import { Link } from 'react-router-dom'

const LandingHeader = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center text-center"
            style={{
                minHeight: "650px",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url(img/landingHeader.jpg)`,
                backgroundSize: "cover"
            }}>
            <div className="col-md-6 ">
                <p className="lead pt-5 mt-5 mb-3" style={{fontSize:"1.8em"}}>L'essentiel pour la gestion de vos projets</p>
                <Link to={"/signup"} className="btn btn-primary" style={{fontSize:"1.2em"}}>S'inscrire</Link>
            </div>
        </div>
    )
}

export default LandingHeader