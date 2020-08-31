import React from 'react'
import { Link } from 'react-router-dom'

const SignFooter = ({ anchor }) => {
    return (
        <nav className="navbar navbar-dark d-flex justify-content-center text-center px-0 w-100 fixed-bottom todoTitleFont" style={{ left: "0", backgroundColor: "#03224c" }}>
            <a href="https://fokjlenot.herokuapp.com/legal" className="btn btn-outline-light py-1" style={{ fontSize: "0.9em" }}>Mentions légales</a>
            <a href="https://fokjlenot.herokuapp.com/contact" className="btn btn-outline-light py-1 mx-2" style={{ fontSize: "0.9em" }}>Contact</a>
            <a href={`${anchor}`} className="btn btn-outline-light py-1" style={{ fontSize: "0.9em" }}>Haut de la page</a>

        </nav>
    )
}

export default SignFooter