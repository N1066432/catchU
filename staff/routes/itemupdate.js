var express = require('express');
var router = express.Router();

//增加引用函式
const item = require('./utility/item');

//接收POST請求
router.post('/', function(req, res, next) {
    var itemID = req.body.itemID;   //取得累別編號

    var newData={
        itemID:itemID,                      //類別編號
        itemName: req.body.itemName,            //取得類別名稱
    } 
    
    item.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess', {results:d});  //傳至成功頁面
        }else{
            res.render('updateFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;