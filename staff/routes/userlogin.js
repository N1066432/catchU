var express = require('express');
var router = express.Router();

//增加引用函式
const user = require('./utility/user');

//接收POST請求
router.post('/', function(req, res, next) {
    var id = req.body.id;                 //取得帳號
    var password = req.body.password;     //取得密碼

    user.login(id, password).then(d => {
        if (d==null){
            req.session.staffphone = null;
            req.session.name = null;           
            res.render('loginFail');  //傳至登入失敗
        }else{
            
            req.session.staffphone = d.staffphone;
            req.session.name = d.username;
            res.render('usershow', {name:d.username});   //導向使用者
            console.log('已登入');
            console.log(d.staffphone)
            console.log(d.username)
        }  
    })
});

module.exports = router;