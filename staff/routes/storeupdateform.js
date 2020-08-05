var express = require('express');
var router = express.Router();

//增加引用函式
var moment = require('moment');
const store = require('./utility/store');

//接收GET請求
router.get('/', function(req, res, next) {
    var no = req.query.storeID;

    store.query(no).then(d => {
        if (d!=null && d!=-1){
            var data = {
                storeID: d.storeID,
                storename: d.storename,
                storeaddress: d.storeaddress,
                phoneno: d.phoneno,
                vacanttable: d.vacanttable,
                businesshours: d.businesshours,
                wifi: d.wifi,
                socket: d.socket,
                providemeals: d.providemeals,
                outsidefood: d.outsidefood,
                chargingstandards: d.chargingstandards,
            }

            res.render('storeupdateform', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;