var express = require('express');
var router = express.Router();
const item = require('./utility/item');

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('itemupdateno');
});

//匯出
module.exports = router;
*/

//接收GET請求
router.get('/', function(req, res, next) {
  item.getDropdownData().then(d => {
      if (d!=[]){
          res.render('itemupdateno', {result:d});  //轉至新增頁面
      }else{
          res.render('notFound');     //導向錯誤頁面
      }  
  });
});

module.exports = router; 