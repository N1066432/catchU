var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    if(req.session.staffphone != null){
        res.render('alreadylogin');
    }else{
        res.render('userloginform');
    }

});

module.exports = router; 