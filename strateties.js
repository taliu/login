const db = require('./db');
const User = db.model('users');
const co = require('co');
const jwt = require('jsonwebtoken');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , BasicStrategy = require('passport-http').BasicStrategy
  , JwtStrategy = require('passport-jwt').Strategy
  , ExtractJwt = require('passport-jwt').ExtractJwt


passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeader(),ExtractJwt.fromBodyField('token')]),
  secretOrKey:process.env.JWT_SECRET||'this is my secret',
}, function (jwt_payload, done) {
  console.log('jwt_payload:', jwt_payload);
   User.findOne({ name: jwt_payload.name }).then(function (user) {
     done(null,user);
   }).catch(err=>done(err));
}));

passport.use('token',new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password'
},function(username,password,done){
   User.findOne({ name: username }).then(function (user) {
      if (user && password == user.password) {
        let token =jwt.sign({name:user.name},process.env.JWT_SECRET||'this is my secret',{expiresIn:20*60}); //token 20分钟有效期
        return done(null, {token:token});
      } else {
        return done(null, false, { message: '用户名或密码错误' })
      }
    }).catch(err => done(err));
}))





passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password'
},
  function (username, password, done) {
    User.findOne({ name: username }).then(function (user) {
      if (user && password == user.password) {
        return done(null, user);
      } else {
        return done(null, false, { message: '用户名或密码错误' })
      }
    }).catch(err => done(err));
  }
));

passport.use(new BasicStrategy(
  function (username, password, done) {
    User.findOne({ name: username }).then(function (user) {
      if (user && password == user.password) {
        return done(null, user);
      } else {
        return done(null, false, { message: '用户名或密码错误' })
      }
    }).catch(err => done(err));
  }
));

passport.serializeUser(function (user, done) {
  console.log('serializeUser:', user);
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findOne({ _id: id }).then(function (user) {
    console.log('deserializeUser:', user);
    done(null, user);
  }).catch(err => done(err));
});

