var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');

//接收POST請求
router.post('/', function(req, res, next) {
    var memberphone = req.body.memberphone;   //取得產品編號
   
    member.remove(memberphone).then(d => {
        if(d>=0){
            res.render('member_remove_Success', {results:d});  //傳至成功頁面     
        }else{
            res.render('member_remove_Fail');     //導向錯誤頁面
        }
    })    
});

module.exports = router;