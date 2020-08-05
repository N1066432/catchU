var express = require('express');
var router = express.Router();

//增加引用函式
const store = require('./utility/store');

//接收POST請求
router.post('/', function(req, res, next) {
    var storeID = req.body.storeID;   //取得店家編號

    var newData={
        storeID:storeID,                   //店家編號
        storeName: req.body.storeName,     //取得店家名稱
        storeAddress: req.body.storeAddress,         //取得店家地址
        phoneNo: req.body.phoneNo,          //取得電話號碼
        vacantTable: req.body.vacantTable,  //取得空桌數
        businessHours: req.body.businessHours,  //取得營業時間
        wifi: req.body.wifi,                    //取得提供wifi
        socket: req.body.socket,                //取得提供插座
        provideMeals: req.body.provideMeals,    //取得提供餐點
        outsideFood: req.body.outsideFood,      //取得可帶外食
        chargingStandards: req.body.chargingStandards     //取得收費標準
    } 
    
    store.update(newData).then(d => {
        if (d>=0){
            res.render('updateSuccess', {results:d});  //傳至成功頁面
        }else{
            res.render('updateFail');     //導向錯誤頁面
        }  
    })
});

//匯出
module.exports = router;