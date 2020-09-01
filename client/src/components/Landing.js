import React from 'react'
import LandingMenu from './LandingPage/LandingMenu'
import Alert from './Layout/Alert'
import LandingHeader from './LandingPage/LandingHeader'
import LandingPresentation from './LandingPage/LandingPresentation'
import LandingFooter from './LandingPage/LandingFooter'
import LandingContact from './LandingPage/LandingContact'

const Landing = () => {
    return (
        <div className="container-fluid pt-5 px-0">
            <LandingMenu />
            <Alert/>
            <LandingHeader/>
            <LandingPresentation/>
            <LandingContact/>
            <LandingFooter/>
        </div>
        
    )
}

export default Landing