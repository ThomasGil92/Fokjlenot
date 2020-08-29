import React, { Fragment } from 'react'
import HomeMenu from './HomePageComponents/HomeMenu'
import HomeProjectList from './HomePageComponents/HomeProjectList'
import Cookie from './Layout/Cookie'
import Footer from './Layout/Footer'
import Alert from './Layout/Alert'
import { useSelector } from 'react-redux'

const Home = () => {
    const user = useSelector(function (state) { return state.user });



    return (
        <Fragment>
            <div className="container-fluid bg-white ">
                <HomeMenu />
                <Cookie />
                <Alert />

                {!user._id ? (
                    <div className="row h-100 justify-content-center bg-orange d-flex align-items-center">

                        <p className="text-dark">Chargement ...</p>
                        <Footer anchor={"#homeTop"} />
                    </div>
                ) : (<HomeProjectList />)}



            </div>

        </Fragment>
    )
}

export default Home