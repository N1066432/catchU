var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const caltime = require('./utility/caltime');

//接收GET請求
router.get('/', function(req, res, next) {
    var memberphone = req.session.memberphone;
    

    caltime.addend(memberphone).then(d => {
        //console.log(d)
        if (d!=null && d!=-1){
            res.render('caltime_addend_form');  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;

/*
var express = require('express');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
    res.render('caltime_addend_form'); 
});

module.exports = router; 
*/