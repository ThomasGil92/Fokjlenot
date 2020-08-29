const User = require("../../models/user")
const sendEmail = require('./email.send')
const msgs = require('./email.msgs')
const templates = require('./email.templates')
const { uuid } = require('uuidv4')

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
exports.collectEmailForPassword = (req, res) => {
    const { email } = req.body
    User.findOne({ email })
        .then(user => {
            const id = uuid()
            // We have a new user! Send them a confirmation email.
            if (user) {
                sendEmail(user.email, templates.resetPassword(id))
                User.findOneAndUpdate(
                    { _id: user._id },
                    { $set: { forgotPassId: id,expireForgotPassId:Date.now() + (3600000*3) } }
                ).then(res=>console.log(res))

                return res.json({ msg: "message envoyé" })


            }

        })
        .catch(err => console.log(err))
}
exports.getUserByForgotId=(req,res)=>{
    const {forgotId}=req.body
    console.log(forgotId)
    User.findOne({"forgotPassId":forgotId})
    .then(user=>{
        console.log(user)
        return res.json(user)
    })
    .catch(err => console.log(err,forgotId))
}
// The callback that is invoked when the user visits the confirmation
// url on the client and a fetch request is sent in componentDidMount.
exports.confirmEmail = (req, res) => {
    const { id } = req.params
    User.findById(id)
        .then(user => {
console.log(id)
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