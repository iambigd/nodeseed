var db = require('../database/db');


var authModel = {};

authModel.login = function(email, password, cb) {
    // console.log('login: %s,%s', email, password);
    logger.log('info','login');
    db.connect();
    db.query('select * from users where email=? and pwd=?', [email, password],
        function(err, rows) {

            var resultOfRows = rows;
            cb(err, resultOfRows);

            db.disConnect();

        });
}

module.exports = authModel;