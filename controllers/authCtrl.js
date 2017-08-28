var authModel = require('../models/authModel.js');

var authCtrl = {};

authCtrl.login = function(req, res) {
    
    console.log('login');

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

module.exports = authCtrl;