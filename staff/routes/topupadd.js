var express = require('express');
var router = express.Router();

//增加引用函式
const topupp = require('./utility/topupp');

//接收POST請求
router.post('/', function(req, res, next) {               
    var memberphone = req.body.memberphone;              
    var staffphone = req.session.staffphone;                  
    var topup = Number(req.body.topup);                  
    var topuppoints = Number(req.body.topuppoints);
    
    console.log(staffphone)
    // 建立一個新資料物件

    var newData={
        memberphone:memberphone,
        staffphone:staffphone,
        topup:topup,
        topuppoints:topuppoints,
       
    } 
    console.log(newData)
    topupp.add(newData).then(d => {
        if (d==0){
            res.render('topupSuccess');  //傳至成功頁面
        }else{
            res.render('topupFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;
