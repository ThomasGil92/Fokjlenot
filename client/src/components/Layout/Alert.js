import React from 'react'
import { useSelector } from 'react-redux'


const Alert = () => {
    const alerts = useSelector(function (state) { return state.alert });

    return (
        alerts.length ? (alerts.map((alert, i) => {
            return (
                <div key={i} className={`alert position-absolute col-12 col-md-10 mx-auto fixed-top mx-auto alert-${alert.alertType}`} style={{
                    zIndex: "500", top: "110px"
                }}>
                    <p className="lead text-dark m-0 text-center" >{alert.msg}</p>
                </div>
            )
        })) : (
                ''
            )

    )
}

export default Alert