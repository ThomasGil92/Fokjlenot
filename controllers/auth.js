const User= require('../models/user')
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbError.js');
require('dotenv').config();
const crypto = require('crypto');

exports.signup = (req, res) => {
    console.log('req.body', req.body)
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

exports.signin = (req, res) => {
    //Find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: 'user with that email does not exist. Please signup'
            });
        }
        //if user is found make sure the email and password match
        //create auth method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                err: "Email and password dont match"
            });
        }
        //generate a signed token with id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        
        //return response with user and token to frontend client
        const { _id, name, email,projectsId,confirmed } = user;
        return res.json({ token, user: { _id, email, name,projectsId,confirmed } });
    });
};
exports.read=(req,res)=>{
        return res.json(req.user)
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth",
    algorithms: ['HS256']
});

exports.isAuth = (req, res, next) => {
    let user = req.user && req.auth && req.user._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};/* 
exports.isAdmin = (req, res, next) => {
    if (req.profile.role !== 1) {
        return res.status(403).json({ error: "Admin Resource! Acces denied" });
    }
    next();
}; */

exports.signout = (req, res) => {
    res.json({ message: 'Signout success' });
};
exports.updatePassword=(req,res)=>{
    console.log(req.body)
    const{name,email,password,forgotPassId,expireForgotPassId,}=req.body
    User.findOne(
        { _id: req.user._id },(err,user)=>{
            user.name=name,
            user.email=email,
            user.forgotPassId=forgotPassId
            user.expireForgotPassId=expireForgotPassId
            user.password=password
            user.save((err, updatedUser) => {
                if (err) {
                    console.log('USER UPDATE ERROR', err);
                    return res.status(400).json({
                        error: 'User update failed'
                    });
                }
                updatedUser.hashed_password = undefined;
                updatedUser.salt = undefined;
                res.json(updatedUser);
            });
        }
    )
}