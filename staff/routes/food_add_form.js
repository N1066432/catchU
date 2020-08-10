var express = require('express');
var router = express.Router();

//增加引用函式
const food = require('./utility/food');

//接收GET請求
router.get('/', function(req, res, next) {
    food.getDropdownData().then(d => {
        if (d!=[]){
            res.render('food_add_form', {result:d});  //轉至新增頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    });
});

module.exports = router; 