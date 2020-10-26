var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    if(req.session.memberphone != null){
        res.render('login_already');
    }else{
        res.render('user_login_form');
    }
});

module.exports = router; 