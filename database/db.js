var mysql = require('mysql');
var config = require('../config')

var dbClient = {};
var conn;

console.log('run db module');
// 資料庫連線
//只需要執行一次=>與end()重覆執行都會爆錯
//Cannot enqueue Handshake after invoking quit 
dbClient.connect = function() {

    // 資料庫設定
    conn = mysql.createConnection({
        user: config.mysql.user,
        password: config.mysql.password,
        host: config.mysql.host,
        port: config.mysql.port,
        database: config.mysql.database
    });

    conn.on('error', function(err) {
        console.log(err.code); // 'ER_BAD_DB_ERROR'
    });

    conn.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('mysql connected as thread-pid: ' + conn.threadId);
    });

}


dbClient.query = function(query, infos, cb) {
    console.log('query:' + query);
    //查詢
    conn.query(query, infos,
        function(err, rows, fields) {

            console.log('query callback');

            cb(err, rows);

            //關閉連結
            // conn.end();
        });

}

dbClient.disConnect = function() {
    console.log('disConnect');
    // body...
    conn.end();
}

// dbClient.connect();


module.exports = dbClient;