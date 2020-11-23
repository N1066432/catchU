var express = require('express');
const orderdetail = require('./utility/orderdetail');
var router = express.Router();

//接收GET請求
router.get('/', function(req, res, next) {
  var memberphone = req.session.memberphone;   //取得產品編號
  var orderdetailid = req.body.orderdetailid;

  orderdetail.getDropdown(memberphone, orderdetailid).then(d => {
      if (d!=[]){
          res.render('orderdetail_update_no', {result:d});  //轉至新增頁面
      }else{
          res.render('notFound');     //導向錯誤頁面
      }  
  });
});

//匯出
module.exports = router;


/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('orderdetail_update_no');
});
*/