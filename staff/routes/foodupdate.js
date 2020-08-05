var express = require('express');
var router = express.Router();

//增加引用函式
const food = require('./utility/food');

//接收POST請求
router.post('/', function(req, res, next) {
    var foodid = req.body.foodid;   //取得餐點編號

    var newData={
        foodid:foodid,                      //餐點編號
        itemID: req.body.itemID,            //取得類別編號
        foodname: req.body.foodname,        //取得餐點名稱
        foodpoint: req.body.foodpoint,      //取得餐點點數
        foodimg: req.body.foodimg,          //取得餐點圖片
    } 
    
    food.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess', {results:d});  //傳至成功頁面
        }else{
            res.render('updateFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;