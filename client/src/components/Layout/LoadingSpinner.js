import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = () => {
    return (

        <div className="w-100 h-100 p-0 m-0 position-absolute d-flex justify-content-center align-items-center text-primary" style={{ backgroundColor: "rgba(255,255,255,1)", left: "0",top:"0", zIndex: "100" }}>
            <div className="text-center">
                <Spinner animation="border" role="status" style={{width:"50px",height:"50px"}}>
                    <span className="sr-only">Loading...</span>
                </Spinner><br />
                <p style={{fontSize:"1.4em"}}>Chargement ...</p>
            </div>

        </div>
    )
}

export default LoadingSpinner