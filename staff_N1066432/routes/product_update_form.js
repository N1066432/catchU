var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const product = require('./utility/product');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.prono;

    product.query(no).then(d => {
        if (d!=null && d!=-1){
            var data = {
                prono: d.prono,
                proname: d.proname,
                price: d.price,
                inventorydate: moment(d.inventorydate).format("YYYY-MM-DD")
            }

            res.render('product_update_form', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;