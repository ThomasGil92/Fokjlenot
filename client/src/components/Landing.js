import React from 'react'
import LandingMenu from './LandingPage/LandingMenu'
import LandingHeader from './LandingPage/LandingHeader'
import LandingPresentation from './LandingPage/LandingPresentation'
import LandingFooter from './LandingPage/LandingFooter'

const Landing = () => {
    return (
        <div className="container-fluid px-0 pt-5">
            <LandingMenu />
            <LandingHeader/>
            <LandingPresentation/>
            <LandingFooter/>
        </div>
        
    )
}

export default Landing