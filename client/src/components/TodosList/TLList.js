import React, { Fragment } from 'react'
import TLCols from './TLCols'
import TLColsForMobile from './TLColsForMobile'
import TLMenu from './TLMenu'

const TLList = () => {


    return (
        <Fragment>
            {window.innerWidth <= 700 ? (
                <div className="d-md-none d-lg-none vh-100 col-12 pt-5">
                    <div className="mt-5 row d-flex pt-4 align-items-center">
                        <TLMenu />
                    </div>
                    <TLColsForMobile />
                </div>
            ) : (
                    <div className="d-none d-md-block vh-100 col-12 pt-5">
                        <div className="mt-5 row d-flex pt-4 align-items-center">
                            <TLMenu />
                        </div>
                        <TLCols />
                    </div>
                )}


        </Fragment>
    )
}

export default TLList