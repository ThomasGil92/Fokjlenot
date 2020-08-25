const User = require("../../models/user")
const sendEmail = require('./email.send')
const msgs = require('./email.msgs')
const templates = require('./email.templates')

exports.collectEmail = (req, res) => {
    const { email } = req.body

    User.findOne({ email })
        .then(user => {

            // We have a new user! Send them a confirmation email.
            if (user) {
                sendEmail(user.email, templates.confirm(user._id))
                if (user.confirmed === false) {
                    return res.json({ msg: msgs.confirm })
                }

            }
            // The user has already confirmed this email address
            else {
                res.json({ msg: msgs.alreadyConfirmed })
            }

        })
        .catch(err => console.log(err))
}

// The callback that is invoked when the user visits the confirmation
// url on the client and a fetch request is sent in componentDidMount.
exports.confirmEmail = (req, res) => {
    const { id } = req.params

    User.findById(id)
        .then(user => {

            // A user with that id does not exist in the DB. Perhaps some tricky 
            // user tried to go to a different url than the one provided in the 
            // confirmation email.
            if (!user) {
                res.json({ msg: msgs.couldNotFind })
            }

            // The user exists but has not been confirmed. We need to confirm this 
            // user and let them know their email address has been confirmed.
            if (user && user.confirmed === false) {
                User.findByIdAndUpdate(id, { confirmed: true })
                    .then(() => res.json({ msg: msgs.confirmed }))
                    .catch(err => console.log(err))
            }
            // The user has already confirmed this email address.
            if (user && user.confirmed) {
                res.json({ msg: msgs.alreadyConfirmed })
            }

        })
        .catch(err => console.log(err))
}