var express = require('express');
var router = express.Router();

//增加引用函式
const orderdetail = require('./utility/orderdetail');

//接收POST請求
router.post('/', function(req, res, next) {
    var orderdetailid = req.body.orderdetailid;  

    var newData={
        orderdetailid:orderdetailid,               
        memberphone: req.body.memberphone,               
        foodname: req.body.foodname,  
        foodpoint: req.body.foodpoint,                   
        foodno: req.body.foodno,                    
        customized: req.body.customized,          
        tableno: req.body.tableno,                  
        //ordtime: req.body.ordtime,                   
       
    } 
    console.log(newData)
    orderdetail.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess', {result:d});  //傳至成功頁面
        }else{
            res.render('updateFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;