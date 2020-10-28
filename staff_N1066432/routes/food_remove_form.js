var express = require('express');
var router = express.Router();
const food = require('./utility/food');

/*
//接收GET請求
router.get('/', function(req, res, next) {
    res.render('food_remove_form'); 
});

module.exports = router;
*/

//接收GET請求
router.get('/', function(req, res, next) {
    food.getfoodnameData().then(d => {
        if (d!=[]){
            res.render('food_remove_form', {result:d});  
        }else{
            res.render('removefoodFail');     //導向錯誤頁面
        }  
    });
});

module.exports = router; 