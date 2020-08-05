var express = require('express');
var router = express.Router();

//增加引用函式
const store = require('./utility/store');

//接收POST請求
router.post('/', function(req, res, next) {
    var storeID = req.body.storeID;   //取得店家編號

    var newData={
        storeID:storeID,                   //店家編號
        storename: req.body.storename,     //取得店家名稱
        storeaddress: req.body.storeaddress,         //取得店家地址
        phoneno: req.body.phoneno,          //取得電話號碼
        vacanttable: req.body.vacanttable,  //取得空桌數
        businesshours: req.body.businesshours,  //取得營業時間
        wifi: req.body.wifi,                    //取得提供wifi
        socket: req.body.socket,                //取得提供插座
        providemeals: req.body.providemeals,    //取得提供餐點
        outsidefood: req.body.outsidefood,      //取得可帶外食
        chargingstandards: req.body.chargingstandards     //取得收費標準
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