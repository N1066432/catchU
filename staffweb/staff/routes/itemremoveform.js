var express = require('express');
const item = require('./utility/item');
var router = express.Router();
/*
//接收GET請求
router.get('/', function(req, res, next) {
    res.render('itemremoveform'); 
});

module.exports = router;
*/

//接收GET請求
router.get('/', function(req, res, next) {
    item.getDropdownData().then(d => {
        if (d!=[]){
            res.render('itemremoveform', {result:d});  //轉至新增頁面
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }  
    });
});

module.exports = router; 