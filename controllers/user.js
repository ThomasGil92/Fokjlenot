const User = require('../models/user')


exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'L\'utilisateur n\'a pas été trouvé'
            })
        }
        req.user = user;
        next();
    });
};

exports.update=(req,res)=>{
    console.log(req.body)
    User.findOneAndUpdate(
        { _id: req.user._id },
        {$push:{projectsId:req.body.justCreatedProject._id}}
        /* (err,user)=>{
            res.json(user)
        } */
    ).then((user,err)=>{
        if(err){
            console.log(err)
        }else{
            
            res.json(user)
        }
    })
}
