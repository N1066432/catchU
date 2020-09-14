var express = require('express');
var router = express.Router();

//增加引用函式
const food = require('./utility/food');

//接收POST請求
router.post('/', function(req, res, next) {
    var foodid = req.body.foodid;   //取得餐點編號
   
    food.remove(foodid).then(d => {
        if(d>=0){
            res.render('removeSuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('removefoodFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;
/*
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
*/