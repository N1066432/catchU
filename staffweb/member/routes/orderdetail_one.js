var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const orderdetail = require('./utility/orderdetail');

//接收GET請求
router.get('/', function(req, res, next) {
    var memberphone = req.session.memberphone;
    //console.log(memberphone)

    orderdetail.list(memberphone).then(data => {
        //console.log(data)
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            res.render('orderdetail_list', {items:data});  //將資料傳給顯示頁面
        }else{
            res.render('orderdetail_notFound');  //導向找不到頁面
        }  
    })
});

module.exports = router;