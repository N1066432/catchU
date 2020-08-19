var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收POST請求
router.post('/', function(req, res, next) {
    console.log(memberphone)
    var memberphone=req.body.memberphone;      //會員手機號碼
    var membername= req.body.membername;        //會員名稱
    var lineid= req.body.lineid;                //lineID
    var gender= req.body.gender;                //性別
    var mail= req.body.mail;                   //mail
    var birthday= req.body.birthday;           //生日
    //var creationdate= req.body.creationdate;    //建立日期
    // 建立一個新資料物件
    var newData={
        memberphone: memberphone,       //會員手機號碼
        membername: membername,         //會員名稱
        lineid: lineid,                //lineID
        gender:gender,                //性別
        mail:mail,                    //mail
        birthday:birthday,            //生日
        //creationdate:creationdate    //建立日期
    } 
    console.log(newData)
    member.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;