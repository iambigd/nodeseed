var db = require('../database/db.js');
var logger = require('../middleware/logger/logger').create('usersModel');


var usersModel = {};

usersModel.create = function() {

}

usersModel.getUserById = function(userId, cb) {
    logger.log('getUserById', 'userId: ' + userId);
    db.connect();
    db.query('select * from users where id=?', [userId],
        function(err, rows) {

            var resultOfRows = rows;
            cb(err, resultOfRows);

            db.disConnect();

        });
}

module.exports = usersModel;