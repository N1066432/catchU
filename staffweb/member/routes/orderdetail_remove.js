var express = require('express');
var router = express.Router();

//增加引用函式
const orderdetail = require('./utility/orderdetail');

//接收POST請求
router.post('/', function(req, res, next) {
    //var memberphone = req.session.memberphone;   //取得產品編號
    var orderdetailid = req.body.orderdetailid;
    
    orderdetail.remove(orderdetailid).then(d => {
        if(d>=0){
            res.render('removeSuccess', {result:d});  //傳至成功頁面     
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;