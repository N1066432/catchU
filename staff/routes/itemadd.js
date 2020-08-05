var express = require('express');
var router = express.Router();

//增加引用函式
const item = require('./utility/item');

//接收POST請求
router.post('/', function(req, res, next) {
    var itemName = req.body.itemName;              //取得類別名稱
    
    // 建立一個新資料物件

    var newData={
        itemName:itemName,
    } 
    console.log(newData)
    item.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;
