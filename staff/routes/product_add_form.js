var express = require('express');
var router = express.Router();

//增加引用函式
const product = require('./utility/product');

//接收GET請求
router.get('/', function(req, res, next) {
    product.getDropdownData().then(d => {
        if (d!=[]){
            res.render('product_add_form', {result:d});  //轉至新增頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    });
});

module.exports = router; 