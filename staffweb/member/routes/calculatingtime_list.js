var express = require('express');
var router = express.Router();

//增加引用函式
const calculatingtime = require('./utility/calculatingtime');

//接收GET請求
router.get('/', function(req, res, next) {
    calculatingtime.list().then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            console.log(data);
            res.render('calculatingtime', {items:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});
//接收POST請求
router.post('/', function(req, res, next) {
    var timeserNo = req.body.timeserNo;         //取得產品編號
    var memberPhone = req.body.memberPhone;     //取得產品編號
    var arrivalTime = req.body.arrivalTime;     //取得產品編號
    var endTime = req.body.timeserNo;           //取得產品編號
    var creationDate = req.body.creationDate;   //取得產品編號

      
});
module.exports = router;