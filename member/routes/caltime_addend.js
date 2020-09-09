var express = require('express');
var router = express.Router();

//增加引用函式
const caltime = require('./utility/caltime');
//const { now } = require('moment');


//接收POST請求
router.post('/', function(req, res, next) {
    var memberphone = req.session.memberphone;              //取得到達時間
    
    // 建立一個新資料物件
    //var timestamp = new Date().getTime();
    //var Timestamp = (new Date()).valueOf();
    
    var newData={   
        memberphone:memberphone
    } 
    console.log(newData)
    caltime.addend(newData).then(d => {
        if (d==0){
            res.render('caltime_end_success');  //傳至成功頁面
        }else{
            res.render('caltime_end_fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;
