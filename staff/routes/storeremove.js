var express = require('express');
var router = express.Router();

//增加引用函式
const store = require('./utility/store');

//接收POST請求
router.post('/', function(req, res, next) {
    var storeID = req.body.storeID;   //取得店家編號
   
    store.remove(storeID).then(d => {
        if(d>=0){
            res.render('removeSuccess', {results:d});  //傳至成功頁面     
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;