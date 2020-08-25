import React from 'react'
import { useSelector } from 'react-redux'


const Alert = () => {
    const alerts = useSelector(function (state) { return state.alert });

    return (
        alerts.length ? (alerts.map((alert, i) => {
            return (
                <div key={i} className={`alert my-3 col-4 mx-auto fixed-bottom mx-auto alert-${alert.alertType}`} style={{
                    zIndex: "500", bottom: "60px"
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