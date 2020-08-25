const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN

// This file is exporting an Object with a single key/value pair.
// However, because this is not a part of the logic of the application
// it makes sense to abstract it to another file. Plus, it is now easily 
// extensible if the application needs to send different email templates
// (eg. unsubscribe) in the future.
module.exports = {

  confirm: id => ({
    subject: 'Confirmation de votre adresse email',
    html: `
      <h2>Fokjlenot</h2><br>
      <span>Application de gestion de projet</span>
      <br><br>
        <p><a href='${CLIENT_ORIGIN}/confirm/${id}'>Cliquez ici</a> pour valider votre adresse mail et activer votre compte.</p>
        <p>A très bientôt.</p>
      
    `,      
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/confirm/${id}`
  })
  
}