var jwt = require('jwt-simple');
var moment = require('moment');
var logger = require('../middleware/logger/logger').create('authCtrl');
var authModel = require('../models/authModel.js');
var config = require('../config');

var authCtrl = {};

authCtrl.login = function(req, res) {

    logger.log('info', "login");
    var postBody = req.body;
    // console.log('email:' + postBody.email);
    // console.log('password:' + postBody.password);

    authModel.login(
        postBody.email,
        postBody.password,
        function(err, rows) {
            // body...
            if (err) {
                console.log(err)
                return;
            }

            // console.log(rows);

            if (rows.length == 0) {
                res.json({
                    status: 404
                });
            } else {

                // res.json(rows[0]);

                var userInfo = rows[0];
                //create a session/or jwt token
                var expires = moment().add('days', 7).valueOf();
                var payload = {
                    id: userInfo.id,
                    // iss: userInfo.id,
                    exp: expires
                };
                var token = jwt.encode(
                    payload,
                    config.authentication.jwtSecret);

                // console.log(token);   

                res.json({
                    token: token,
                    exp: expires
                });
            }
        });
}

authCtrl.logout = function(req, res) {

    //destory session

}

module.exports = authCtrl;