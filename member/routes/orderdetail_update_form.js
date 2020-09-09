var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const orderdetail = require('./utility/orderdetail');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.orderdetailid;
    var foodname = req.body.foodname;

    orderdetail.query(no, foodname).then(d => {
        if (d!=null && d!=-1){
            res.render('orderdetail_update_form', {result:d});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;

/*
var data = {
    orderdetailid: d.orderdetailid,
    foodid: d.foodid,
    foodname: d.foodname,
    customized: d.customized,
    memberphone: d.memberphone,
    tableno: d.tableno
    //ordtime: moment(d.ordtime).format("YYYY-MM-DD"),
}
*/
