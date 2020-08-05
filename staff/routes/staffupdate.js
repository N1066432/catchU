var express = require('express');
var router = express.Router();

//增加引用函式
const staff = require('./utility/staff');

//接收POST請求
router.post('/', function(req, res, next) {
    var userName = req.body.userName;   //取得員工姓名

    var newData={
        userName:userName,                   //員工姓名
        staffPhone: req.body.staffPhone,     //取得員工電話
        nickName: req.body.nickName,         //取得暱稱
        password: req.body.password          //取得密碼
    } 
    
    staff.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess', {results:d});  //傳至成功頁面
        }else{
            res.render('updateFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;