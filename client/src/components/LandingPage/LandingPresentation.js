import React from 'react'
import LandingPresentationFirstBlock from './LandingPresentationFirstBlock'

const LandingPresentation = () => {
    return (
        <div className="container text-center mt-5">
            <div className="col-md-10 mx-auto text-fokjlenot">
                <h2><i>Gérez votre temps, gagnez en efficacité <br />et réalisez tous vos projets</i></h2>
                <div className="text-dark text-center text-justify mx-auto mt-4 lead">
                    <p><strong><i>Fokjlenot</i></strong> est une application de gestion de projets pour votre vie professionnelle comme pour votre vie de tous les jours. Avec <strong><i>Fokjlenot</i></strong>, structurez votre emploi du temps en plusieurs projets et tâches à réaliser afin de mener tous ces objectifs à termes.</p>
                    {/* <p>Combien de fois avez vous oublié de passer chercher ce qu'il vous fallait chez l'épicier?</p>
                    <p>Connaissez vous le sentiment d'être débordé par le travail à réaliser?</p> */}
                    <p className="mt-3"></p>
                </div>
            </div>
            <LandingPresentationFirstBlock/>

        </div>
    )
}

export default LandingPresentation