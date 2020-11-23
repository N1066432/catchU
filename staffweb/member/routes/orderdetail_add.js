var express = require('express');
var router = express.Router();

//增加引用函式
const orderdetail = require('./utility/orderdetail');

//接收POST請求
router.post('/', function(req, res, next) {
    console.log('222222222222222')
    var memberphone=req.session.memberphone;   
    var k = req.body.foodname;
    k = k.split(',');
    var foodname= k[0];  
    var foodpoint= k[1];             
    var foodno= req.body.foodno;                    
    var customized= req.body.customized;            
    var tableno=req.body.tableno;                      

    // 建立一個新資料物件
    var newData={
        memberphone: memberphone,
        foodname: foodname,
        foodpoint: foodpoint,
        foodno: foodno,                     
        customized: customized,             
        tableno: tableno
    } 
    console.log('333333333333333333')
    console.log(newData)
    orderdetail.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;