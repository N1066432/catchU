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
                storeName: d.storeName,
                storeAddress: d.storeAddress,
                phoneNo: d.phoneNo,
                vacantTable: d.vacantTable,
                businessHours: d.businessHours,
                wifi: d.wifi,
                socket: d.socket,
                provideMeals: d.provideMeals,
                outsideFood: d.outsideFood,
                chargingStandards: d.chargingStandards,
            }

            res.render('storeupdateform', {item:data});  //將資料傳給更新頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

//匯出
module.exports = router;