var express = require('express');
var router = express.Router();

//增加引用函式
const item = require('./utility/item');

//接收GET請求
router.get('/', function(req, res, next) {
    item.list().then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            console.log(data);
            res.render('itemlist', {items:data});  //將資料傳給顯示頁面
        }else{
            res.render('itemnotFound');  //導向找不到頁面
        }  
    })
});

module.exports = router;