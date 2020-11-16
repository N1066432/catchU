var express = require('express');
var router = express.Router();

//增加引用函式
const caltime = require('./utility/caltime');


//接收POST請求
router.post('/', function(req, res, next) {
    var memberphone = req.session.memberphone;      //取得到達時間

    var newData={   
        memberphone:memberphone,
        ttotal: req.body.ttotal,
        sumtotal: req.body.sumtotal,
        totalpoint: req.body.totalpoint,
        confoirm: req.body.confoirm,

    }  

    caltime.query(newData).then(d => {
        if (d.rowCount>0){
            res.render('caltime_end_success', {result:d});  //傳至成功頁面
        }else{
            res.render('caltime_end_fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;