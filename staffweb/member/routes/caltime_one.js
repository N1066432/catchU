var express = require('express');
var router = express.Router();

//增加引用函式
const caltime = require('./utility/caltime');

//接收POST請求
router.post('/', function(req, res, next) {
    var memberphone = req.session.memberphone;   //取得會員手機號碼

    var newData={
        memberphone: memberphone,         //會員手機號碼
        endtime: req.body.endtime,        
  
       
    } 
    console.log(newData)
    caltime.addend(newData).then(d => {
        if (d>=0){
            res.render('caltime_end_success', {results:d});  //傳至成功頁面
        }else{
            res.render('caltime_end_fail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;


/*
var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const caltime = require('./utility/caltime');

//接收GET請求
router.post('/', function(req, res, next) {
    var memberphone = req.session.memberphone;
    //console.log(memberphone)

    caltime.query(memberphone).then(data => {
        //console.log(data)
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            res.render('caltime_addend_form', {items:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

module.exports = router;
*/