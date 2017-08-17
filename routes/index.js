var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//呼叫一個vers/index.jade
  res.render('index', { title: 'Express' });
});

module.exports = router;
