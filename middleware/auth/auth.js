var jwt = require("jwt-simple");

var passport = require("passport");
var passportJWT = require("passport-jwt");


var logger = require('../../middleware/logger/logger').create('auth');
var config = require('../../config');
var usersModel = require('../../models/usersModel');

var ExtractJwt = passportJWT.ExtractJwt;
//使用jwt策略
var JwtStrategy = passportJWT.Strategy;

//取得用戶參數的機制
var params = {
    authScheme: 'JWT',
    //放了會done error
    // passReqToCallback: true,
    secretOrKey: config.authentication.jwtSecret,
    //requried!!
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    // jwtFromRequest: ExtractJwt.fromHeader(config.authentication.header)
};

var jwtStrategy = new JwtStrategy(params, function(payload, done) {

    // var user = users[payload.id] || null;
    //找出用戶
    // console.log('payload id:' + payload.id);
    logger.log('info', 'init strategy: ' + payload.id);
    var user = null;

    usersModel.getUserById(
        payload.id,
        function(err, rows) {
            var user = rows[0];
            console.log(user);
            if (user) {
                //透過done可以把用戶資訊丟到password.authenticate的callback
                return done(null, user);

            } else {

                return done(new Error("User not found: " + payload.id), null);
                // or you could create a new account
            }

        });
});

//載入策略
passport.use(jwtStrategy);

///export auth object
var auth = {};
auth.initialize = function(req, res, next) {
    passport.initialize();
}

auth.verifyJwt = function(req, res, next) {

    logger.log('info', 'called verifyJwt');

    // console.log(req.headers);
    //headers[小寫headername]
    var token = req.body.token || req.query.token ||
        req.headers[config.authentication.header.toLowerCase()];

    logger.log('info', 'token:' + token);
    // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.k19w9H3UCDI0MgVC4M-6soP12rmeYFTEnpaG1iYbi58';

    ///不靠passport.js的解法
    // if (token) {

    //     var decodedPayload = jwt.decode(
    //         token,
    //         config.authentication.jwtSecret);

    //     logger.log('info', 'decoded payload form jwt:');
    //     console.log(decodedPayload);

    //     if (decodedPayload.exp <= Date.now()) {
    //         logger.log('warn', 'Access token has expired:' + token);

    //         res.status(400).json({
    //             message: 'Access token has expired'
    //         });
    //     }

    //     // If the token is still valid, 
    //     // If the token is still valid, we can retrieve the user and attach it to the request object
    //     logger.log('info', 'valid jwt :' + token);
    //     next();
    // } else {
    //     return res.status(401).json({ message: 'cannot find authorization' });
    // }

    ///用passport.authenticate

    passport.authenticate(
        'jwt',
        config.authentication.jwtSession,
        function(err, user, info) {
            //user = payload of jwt
            logger.log('info', 'passport jwt callback');
            
            console.log(err);
            console.log(user);
            console.log(info);

            if (err) {
                return next(err);
            }

            if (!user) {

                // return res.send("Custom Unauthorised").end();
                return res.status(401).json({ message: 'Custom Unauthorised' });
            }

            req.user = user; // Forward user information to the next middleware

            console.log(req.user.email);

            next();

        })(req, res, next);

}
module.exports = auth;