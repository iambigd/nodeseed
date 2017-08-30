var usersModel = require('../models/usersModel.js');


var users = {};


users.getUserById = function(req, res) {
    
    var userId = req.params.userId;

    console.log('getUserById', 'uesr id:' + userId);

    usersModel.getUserById(
        userId,
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

                res.json(rows[0]);

                //create a session/or jwt token

            }
        });
}

module.exports = users;