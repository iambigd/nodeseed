var passport = require("passport");
var passportJWT = require("passport-jwt");

// var users = require("./users.js");  

var config = require("../../config");

var ExtractJwt = passportJWT.ExtractJwt;
//使用jwt策略
var Strategy = passportJWT.Strategy;

//取得用戶參數的機制
var params = {
    passReqToCallback: true,
    secretOrKey: config.authentication.jwtSecret,
    //requried!!
    jwtFromRequest: ExtractJwt.fromHeader()
};

var strategy = new Strategy(params, function(payload, done) {

    // var user = users[payload.id] || null;
    //找出用戶
    console.log('payload id:' + payload.id);

    var user = null;
    if (user) {

        return done(null, {
            id: user.id
        });
    } else {


        return done(new Error("User not found"), null);
    }
});

//載入策略
passport.use(strategy);

var auth = {};
auth.initialize = function(req,res,next) {
    passport.initialize();
}

auth.jwt = function(req,res,next){
    console.log('call jwt method');

    console.log(req.headers);
     passport.authenticate(
        'jwt', 
        config.authentication.jwtSession, 
        function(err, user, info) {

        //headers[小寫headername]
        var token = req.body.token || req.query.token || 
        req.headers[config.authentication.header.toLowerCase()];
        console.log('token:' + token);

        if (err) {
            return next(err);
        }

        if (!user) { 

            // return res.send("Custom Unauthorised").end();
            return res.status(401).json({message:'Custom Unauthorised'});
        } 
 
        req.user = user; // Forward user information to the next middleware
        next();

    })(req, res, next);
}
module.exports = auth;