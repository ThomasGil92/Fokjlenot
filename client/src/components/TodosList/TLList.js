import React from 'react'
import TLCols from './TLCols'
import TLMenu from './TLMenu'

const TLList = () => {

   
    return (
        <div className="vh-100 col-12 pt-5">
            <div className=" mt-5 row d-flex pt-4 align-items-center">
                <TLMenu />
            </div>
            <TLCols />
        </div>
    )
}

export default TLList