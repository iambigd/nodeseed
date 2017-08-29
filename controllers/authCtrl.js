var authModel = require('../models/authModel.js');

var winston = require('winston');
winston.level = 'debug';

  // logger.log('info', 'Hello distributed log files!');
  // winston.info('Hello again distributed logs');


var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)()
      // new (winston.transports.File)({ filename: 'somefile.log' })
    ]
});

logger.log('info', 'Hello distributed log files!');
// logger.level = process.env.LOG_LEVEL;

var authCtrl = {};

authCtrl.login = function(req, res) {
    
    // console.log('login');
   logger.log('debug', "127.0.0.1 - there's no place like home");
    var postBody = req.body;
    console.log('email:' + postBody.email);
    console.log('password:' + postBody.password);

    authModel.login(
        postBody.email,
        postBody.password,
        function (err,rows) {
            // body...
            if(err){
                console.log(err)
                return;
            }

            // console.log(rows);

            if(rows.length == 0){
                res.json({
                    status:404
                });
            }else{
                res.json(rows[0]);

                //create a session/or jwt token
            }
        });
}

authCtrl.logout = function(req, res) {

}
module.exports = authCtrl;