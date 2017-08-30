var db = require('../database/db.js');


var usersModel = {};

usersModel.create = function(){

}

usersModel.getUserById = function (userId,cb) {
	db.connect();
    db.query('select * from users where id=?', [userId],
        function(err, rows) {

            var resultOfRows = rows;
            cb(err, resultOfRows);

            db.disConnect();

        });
}

module.exports = usersModel;