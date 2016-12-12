const express = require('express');
const app = express.Router();
const passport = require('passport')
module.exports=app;


app.get('/login', (req, res) => {
    res.render('login',{form:{}});
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/web/login');
});


app.post('/login', (req, res, next) => {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.render('login', {form:req.body,info:info}); }
        req.logIn(user, function (err) {//establish a session  and send a response.
            if (err) { return next(err); }
            return res.redirect('/web/');
        });
    })(req, res, next);
});


app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        return res.redirect('/web/login');
    }
});


app.get('/', (req, res) => {
    res.render('index', { name: req.user.name });
})