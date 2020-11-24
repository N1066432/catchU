var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const member = require('./utility/member');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.session.memberphone;

    member.query(no).then(d => {
        if (d!=null && d!=-1){
            var data = {
                memberphone: d.memberphone,
                password: d.password,
                membername: d.membername,
                gender: d.gender,
                birthday: moment(d.birthday).format("YYYY-MM-DD"),
                //creationdate: moment(d.creationdate).format("YYYY-MM-DD"),
            }

            res.render('member_update_form', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;