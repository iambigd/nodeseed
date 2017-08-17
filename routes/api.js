/*簡單的api範例*/
var express = require('express');

//載入控制器
var messagesCtrl = require('../controllers/messagesCtrl');

var router = express.Router();

/// Messages ROUTER ///

//所有訊息
router.get('/messages', messagesCtrl.index);

//單一訊息
//使用網址path的方式，帶入指定物件的id
router.route('/messages/:id') 
.get(messagesCtrl.read)

.post(messagesCtrl.create)

.put(messagesCtrl.update)

.delete(messagesCtrl.delete)


module.exports = router;