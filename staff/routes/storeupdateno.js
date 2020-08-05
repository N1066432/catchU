var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('storeupdateno');
});

//匯出
module.exports = router;