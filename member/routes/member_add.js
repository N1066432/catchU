var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收POST請求
router.post('/', function(req, res, next) {

    var memberphone=req.body.memberphone;      //會員手機號碼
    var password=req.body.password;            //密碼
    var membername= req.body.membername;       //會員名稱
    var gender= req.body.gender;               //性別
    var birthday= req.body.birthday;           //生日

    // 建立一個新資料物件
    var newData={
        memberphone: memberphone,       //會員手機號碼
        password: password,             //密碼
        membername: membername,         //會員名稱
        gender:gender,                  //性別
        birthday:birthday,              //生日
    } 
    console.log(newData)
    member.add(newData).then(d => {
        if (d==0){
            res.render('registered_success');  //傳至成功頁面
        }else{
            res.render('registered_fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;