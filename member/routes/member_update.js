var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收POST請求
router.post('/', function(req, res, next) {
    var memberphone = req.body.memberphone;   //取得會員手機號碼

    var newData={
        memberphone: memberphone,               //會員手機號碼
        membername: req.body.membername,        //會員名稱
        password: req.body.password,           //密碼
        gender: req.body.gender,                //性別
        birthday: req.body.birthday,            //生日
        //creationdate: req.body.creationdate    //建立日期
       
    } 
    console.log(newData)
    member.update(newData).then(d => {
        if (d>=0){
            res.render('member_update_Success', {results:d});  //傳至成功頁面
        }else{
            res.render('member_update_Fail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;