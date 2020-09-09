var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    res.render('caltime_addend_form'); 
});

module.exports = router; 