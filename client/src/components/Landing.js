import React from 'react'
import LandingMenu from './LandingPage/LandingMenu'
import Alert from './Layout/Alert'
import LandingHeader from './LandingPage/LandingHeader'
import LandingPresentation from './LandingPage/LandingPresentation'
import Footer from './Layout/Footer'
import LandingContact from './LandingPage/LandingContact'
import Cookie from './Layout/Cookie'

const Landing = () => {
    return (
        <div className="container-fluid pt-5 px-0">
            <LandingMenu />
            <Alert/>
            <Cookie/>
            <LandingHeader/>
            <LandingPresentation/>
            <LandingContact/>
            <Footer anchor={"#landingTop"}/>
        </div>
        
    )
}

export default Landing