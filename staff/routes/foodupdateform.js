var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const food = require('./utility/food');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.foodid;

    food.query(no).then(d => {
        if (d!=null && d!=-1){
            res.render('foodupdateform', {result:d});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;