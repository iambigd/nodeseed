var db = require('../database/db.js');


var auth = {};

auth.login = function(req, res) {
    
    console.log('login');
    
    // console.log(req.body);
    db.query('select * from users where email=? and password=?', ['ken.tsai@emelexplorer.com', '11111111'], function(err, recordset) {
        if (err) {
            console.log(err);
            res.json({
                status: 404
            });
        }
        //send records as a response
        res.json({
            status: 200
        });
    });
}

module.exports = auth;