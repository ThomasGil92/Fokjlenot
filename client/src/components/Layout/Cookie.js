import React, { Fragment, useEffect } from 'react';
import CookieBanner from 'react-cookie-banner';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setAccept } from "../../actions"


const Cookie = () => {
    const accept = useSelector((state) => state.accept)
    const dispatch = useDispatch();

    useEffect(function () {
            dispatch(setAccept())
    }, [dispatch]);
    return (
        <div className="position-absolute col-12 p-0 home-cookie-fix bg-dark">
            <CookieBanner
                styles={{
                    banner: { height: "100px",bottom:"0px" },
                    message: { fontWeight: "200", fontSize: "15px", display: 'block', lineHeight: "inherit" }
                }}
                message="Ce site utilise des cookies pour améliorer votre navigation. En cliquant sur le bouton « Ok » ou en poursuivant votre navigation via une action de défilement, vous acceptez le traitement de vos données personnelles (ex: adresse ip) pour servir ces différentes finalités."
                onAccept={() => {
                    dispatch(setAccept());
                }}
                buttonMessage="Ok j'ai compris"
                link={
                    <Fragment>
                        <div className="row justify-content-center py-1 m-0 p-0">
                            <a className="mr-2 btn btn-outline-light" rel="noopener noreferrer" href='https://support.google.com/accounts/answer/61416?co=GENIE.Platform%3DDesktop&hl=fr' target="_blank">
                                Plus d'info sur les cookies
          </a>
                            <Link className=" btn btn-outline-light" to={'/legal'}>
                                Mention Légales
          </Link>
                        </div>

                    </Fragment>
                }
                cookie="user-has-accepted-cookies" />
        </div>

    )
}
export default Cookie