const express = require('express');
const router = express.Router();
const {
    collectEmail,
    confirmEmail,
    collectEmailForPassword,
    getUserByForgotId
} = require('../controllers/email/email.js');

router.post("/email", collectEmail);
router.post("/emailPassword", collectEmailForPassword);
router.post("/resetVerif",getUserByForgotId );
router.get("/email/confirm/:id", confirmEmail)

module.exports = router;