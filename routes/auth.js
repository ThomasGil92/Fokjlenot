const express = require('express');
const router = express.Router();
const {
    signup,
    signin,
    signout,
    requireSignin,
    isAuth,
    read,
    updatePassword
    
} = require('../controllers/auth');
const { update } = require('../controllers/user')
const {
    userById
} = require('../controllers/user');
const { signupValidator } = require('../validator');

router.post("/signin", signin);
router.get("/user/:userId",read)
router.post("/signup", signupValidator, signup);
router.put("/user-update-project/:userId",requireSignin, isAuth, update)
router.put("/password-update/:userId",signupValidator, updatePassword)
router.get("/signout/:userId", requireSignin, isAuth, signout);


router.param("userId", userById);
module.exports = router;