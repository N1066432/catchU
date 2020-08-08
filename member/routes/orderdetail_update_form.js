var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const orderdetail = require('./utility/orderdetail');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.orderdetailid;

    orderdetail.query(no).then(d => {
        if (d!=null && d!=-1){
            var data = {
                orderdetailid: d.orderdetailid,
                foodid: d.foodid,
                foodno: d.foodno,
                customized: d.customized,
                memberphone: d.memberphone,
                tableno: d.tableno,
                //ordtime: moment(d.ordtime).format("YYYY-MM-DD"),
            }

            res.render('orderdetail_update_form', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;