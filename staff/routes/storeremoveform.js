var express = require('express');
const store = require('./utility/store');
var router = express.Router();

router.get('/', function(req, res, next) {
    store.getDropdownData().then(d => {
        if (d!=[]){
            res.render('storeremoveform', {result:d});  //轉至新增頁面
        }else{
            res.render('removeFail');     //導向錯誤頁面
        }  
    });
});

module.exports = router; 