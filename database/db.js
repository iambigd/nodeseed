var mysql = require('mysql');

// 資料庫設定
var conn = mysql.createConnection({
    user: 'bigd',
    password: 'bigd*man',
    host: '10.211.55.10',
    port: '3306',
    database: 'myapp'
});
// 資料庫連線
conn.connect( function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + conn.threadId);
});

module.exports = conn;