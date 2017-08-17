var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with hello');
// });

router.get('/',
 function(req, res, next) {
 	var qs = req.query;
 	console.log('get qs: ' + qs);
 	
 	// res.send('respond with hello xxx');
 	res.json({ message: "hello rest" });
});

module.exports = router;