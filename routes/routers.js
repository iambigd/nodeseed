/*簡單的api範例*/
var express = require('express');
var config = require('../config');
// var authJwt = require('../middleware/auth/authJwt');

var auth = require('../middleware/auth/auth');

//載入router
var router = express.Router();

//載入控制器
var messagesCtrl = require('../controllers/messagesCtrl');
var authCtrl = require('../controllers/authCtrl');
var usersCtrl = require('../controllers/usersCtrl');

/***
 *      /$$$$$$  /$$   /$$ /$$$$$$$$ /$$   /$$
 *     /$$__  $$| $$  | $$|__  $$__/| $$  | $$
 *    | $$  \ $$| $$  | $$   | $$   | $$  | $$
 *    | $$$$$$$$| $$  | $$   | $$   | $$$$$$$$
 *    | $$__  $$| $$  | $$   | $$   | $$__  $$
 *    | $$  | $$| $$  | $$   | $$   | $$  | $$
 *    | $$  | $$|  $$$$$$/   | $$   | $$  | $$
 *    |__/  |__/ \______/    |__/   |__/  |__/
 *                                            
 *                                            
 *                                            
 */
/// Auth ROUTER ///
// router.route('/auth/login')
//     .post(function(req, res) {
//     	console.log(req.body);
//     });
router.route('/apis/auth/login')
    .post(authCtrl.login);

/***
 *     /$$      /$$ /$$$$$$$$  /$$$$$$   /$$$$$$   /$$$$$$   /$$$$$$  /$$$$$$$$
 *    | $$$    /$$$| $$_____/ /$$__  $$ /$$__  $$ /$$__  $$ /$$__  $$| $$_____/
 *    | $$$$  /$$$$| $$      | $$  \__/| $$  \__/| $$  \ $$| $$  \__/| $$      
 *    | $$ $$/$$ $$| $$$$$   |  $$$$$$ |  $$$$$$ | $$$$$$$$| $$ /$$$$| $$$$$   
 *    | $$  $$$| $$| $$__/    \____  $$ \____  $$| $$__  $$| $$|_  $$| $$__/   
 *    | $$\  $ | $$| $$       /$$  \ $$ /$$  \ $$| $$  | $$| $$  \ $$| $$      
 *    | $$ \/  | $$| $$$$$$$$|  $$$$$$/|  $$$$$$/| $$  | $$|  $$$$$$/| $$$$$$$$
 *    |__/     |__/|________/ \______/  \______/ |__/  |__/ \______/ |________/
 *                                                                             
 *                                                                             
 *                                                                             
 */
/// Messages ROUTER ///

//所有訊息
router.route('/apis/messages')
    .get(messagesCtrl.index)
    .post(messagesCtrl.create);

//單一訊息
//使用網址path的方式，帶入指定物件的id
router.route('/apis/messages/:id')
    .get(messagesCtrl.read)
    .put(messagesCtrl.update)
    .delete(messagesCtrl.delete);

/***
 *     /$$   /$$  /$$$$$$  /$$$$$$$$ /$$$$$$$   /$$$$$$ 
 *    | $$  | $$ /$$__  $$| $$_____/| $$__  $$ /$$__  $$
 *    | $$  | $$| $$  \__/| $$      | $$  \ $$| $$  \__/
 *    | $$  | $$|  $$$$$$ | $$$$$   | $$$$$$$/|  $$$$$$ 
 *    | $$  | $$ \____  $$| $$__/   | $$__  $$ \____  $$
 *    | $$  | $$ /$$  \ $$| $$      | $$  \ $$ /$$  \ $$
 *    |  $$$$$$/|  $$$$$$/| $$$$$$$$| $$  | $$|  $$$$$$/
 *     \______/  \______/ |________/|__/  |__/ \______/ 
 *                                                                                                  
 *                                                      
 *                                                      
 *                                                      
 */
// router.route('/apis/users/:userId')
    // .get(usersCtrl.getUserById);
router.route('/apis/users/:userId')
    .get(auth.verifyJwt,usersCtrl.getUserById);

module.exports = router;