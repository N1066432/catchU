var express = require('express');
var router = express.Router();

//增加引用函式
const caltime = require('./utility/caltime');


//接收POST請求
router.post('/', function(req, res, next) {
    var memberphone = req.session.memberphone;      //取得到達時間

    var newData={   
        memberphone:memberphone,
        //arrivaltime: req.body.arrivaltime,
        //endtime: req.body.endtime,

    }  

    caltime.query(newData).then(d => {
        if (d>=0){
            res.render('caltime_end_success', {result:d});  //傳至成功頁面
        }else{
            res.render('caltime_end_fail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;

/*
let d1 = new Date('2020/9/16 16:00:00');
let d2 = new Date('2020/9/16 18:30:30');

console.log((d2-d1)/1000);

let d1 = arrivaltime;
let d2 = endtime;
var total = ((d1-d2)/1000);
console.log(total)

*/