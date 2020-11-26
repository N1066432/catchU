var express = require('express');
var router = express.Router();

//增加引用函式
const orderdetail = require('./utility/orderdetail');

//接收GET請求
router.get('/', function(req, res, next) {
    var memberphone = req.session.memberphone;   //取得產品編號
    var orderdetailid = req.body.orderdetailid;

    orderdetail.getDropdown(memberphone, orderdetailid).then(d => {
        if (d!=[]){
            res.render('orderdetail_remove_form', {result:d});  //轉至新增頁面
        }else{
            res.render('orderdetail_notFound');     //導向錯誤頁面
        }  
    });
});

module.exports = router; 

