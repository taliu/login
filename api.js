const express = require('express');
const app = express.Router();
const db = require('./db');
const User = db.model('users');
const passport = require('passport')
module.exports=app;

app.post('/login',(req,res,next)=>{
    passport.authenticate('token', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { 
            res.json({error:info.message});
        }else{
            res.json({message:'登入成功',token:user.token});
        }
    })(req, res, next);
})

app.use(passport.authenticate('jwt', { session: false}))

app.get('/users',(req,res,next)=>{
    User.find().then(userList=>res.json(userList)).catch(err=>next(err));
})