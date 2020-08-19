var express = require('express');
var router = express.Router();

//增加引用函式
const item = require('./utility/item');

//接收POST請求
router.post('/', function(req, res, next) {
    var itemID = req.body.itemID;   //取得類別編號
   
    item.remove(itemID).then(d => {
        if(d>=0){
            res.render('removeSuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;