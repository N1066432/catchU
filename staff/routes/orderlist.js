var express = require('express');
var router = express.Router();

//增加引用函式
const order = require('./utility/order');
var moment = require('moment');

//接收GET請求
router.get('/', function(req, res, next) {
    order.list().then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            for(var i=0; i<data.length; i++){
                data[i].ordtime=moment(data[i].ordtime).format("YYYY-MM-DD hh:mm:ss")     
            }    
            console.log(data);
            res.render('orderlist', {items:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

module.exports = router;