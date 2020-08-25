import React from 'react'

const LandingPresentationFirstBlock = () => {
    return (
        <div className="col-12 col-md-10 mx-auto text-fokjlenot mt-4">
            <div className="row p-0 h-100 d-flex justify-content-between " style={{ minHeight: "400px" }}>
                <div
                    className="col-12 col-md-6 d-flex justify-content-center rounded align-items-center"
                    style={{ backgroundColor: `rgb(3,34,76,0.1)`,boxShadow: "5px 5px 10px rgb(3,34,76,0.3)" }}
                >
                    <div className="card py-2 col-md-8 px-0">
                        <img className="mx-auto" style={{ height: "140px", width: "220px" }} src="./img/capture.JPG" />
                    </div>

                </div>
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <div className="py-md-2 col-md-10 text-center">
                        <p>Ne perdez pas de temps à fouiller, grâce à <strong><i>Fokjlenot</i></strong>, visualisez rapidement vos projets et tâches en cours</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPresentationFirstBlock