var express = require('express');
var router = express.Router();

//增加引用函式
const orderdetail = require('./utility/order');

//接收POST請求
router.post('/', function(req, res, next) {
    var orderdetailid = req.body.orderdetailid;   //取得會員手機號碼

    var newData={
        orderdetailid: orderdetailid,               //會員手機號碼
        foodid: req.body.foodid,                    //會員手機號碼
        foodno: req.body.foodno,                    //會員名稱
        customized: req.body.customized,            //lineID
        ordtime: req.body.ordtime                   //建立日期
       
    } 
    
    orderdetail.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess', {results:d});  //傳至成功頁面
        }else{
            res.render('updateFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;