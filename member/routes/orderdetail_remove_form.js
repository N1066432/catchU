var express = require('express');
var router = express.Router();

//增加引用函式
const orderdetail = require('./utility/orderdetail');

//接收GET請求
router.get('/', function(req, res, next) {
    orderdetail.getDropdownData().then(d => {
        if (d!=[]){
            res.render('orderdetail_remove_form', {result:d});  //轉至新增頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    });
});

module.exports = router; 

/*
//接收GET請求
router.get('/', function(req, res, next) {
    res.render('orderdetail_remove_form'); 
});

module.exports = router;
*/