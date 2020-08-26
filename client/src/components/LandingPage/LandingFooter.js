import React from 'react'
import { Link } from 'react-router-dom'

const LandingFooter = () => {
    return (
        <nav className="navbar navbar-dark d-flex justify-content-center text-center px-0  position-absolute mt-md-5  col-12 w-100 todoTitleFont" style={{ left: "0", backgroundColor: "#03224c" }}>
            <a href="https://fokjlenot.herokuapp.com/legal" className="btn btn-outline-light py-1" style={{ fontSize: "0.9em" }}>Mentions légales</a>
            <a href="#landingTop" className="btn btn-outline-light py-1" style={{ fontSize: "0.9em" }}>Haut de la page</a>

        </nav>
    )
}

export default LandingFooter