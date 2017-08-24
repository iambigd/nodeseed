/*簡單的api範例*/
var express = require('express');

//載入控制器
var messagesCtrl = require('../controllers/messagesCtrl');
var authCtrl = require('../controllers/authCtrl');

var router = express.Router();


/// Auth ROUTER ///
// router.route('/auth/login')
//     .post(function(req, res) {
//     	console.log(req.body);
//     });
router.route('/auth/login')
    .post(authCtrl.login);
    
/// Messages ROUTER ///

//所有訊息
router.route('/messages')
    .get(messagesCtrl.index)
    .post(messagesCtrl.create);

//單一訊息
//使用網址path的方式，帶入指定物件的id
router.route('/messages/:id') 
.get(messagesCtrl.read)
.put(messagesCtrl.update)
.delete(messagesCtrl.delete);


module.exports = router;
