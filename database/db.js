var mysql = require('mysql');

var dbClient = {};
// 資料庫設定
var conn = mysql.createConnection({
    user: 'demo',
    password: '1688999',
    host: '127.0.0.1',
    port: '3306',
    database: 'nodeseed'
});

// 資料庫連線
// conn.connect( function(err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log('mysql connected as thread-pid: ' + conn.threadId);
// });

dbClient.query = function(query, infos, cb) {


    // 資料庫連線
    conn.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('mysql connected as thread-pid: ' + conn.threadId);
    });

    //查詢
    conn.query(query, infos,
        function(err, rows, fields) {

            console.log('query callback');

            cb(err, rows);

            //關閉連結
            conn.end();
        });

}

module.exports = dbClient;