var express = require('express');
var router = express.Router();

//增加引用函式
const orderdetail = require('./utility/orderdetail');
const e = require('express');

//接收GET請求
router.get('/', function(req, res, next) {
    console.log("1111111111111")
    orderdetail.getDropdownData().then(d => {
        if (d!=[]){
            console.log(d)
            res.render('food_list', {result:d});  //轉至新增頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    });
});

module.exports = router;