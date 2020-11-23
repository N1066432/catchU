var express = require('express');
var router = express.Router();
const store = require('./utility/store');

router.get('/', function(req, res, next) {
  store.getDropdownData().then(d => {
      if (d!=[]){
          res.render('storeupdateno', {result:d});  //轉至新增頁面
      }else{
          res.render('notFound');     //導向錯誤頁面
      }  
  });
});

module.exports = router; 