const express = require('express');
const router = express.Router();
const {
    collectEmail,
    confirmEmail
} = require('../controllers/email/email.js');

router.post("/email", collectEmail);
router.get("/email/confirm/:id", confirmEmail)

module.exports = router;