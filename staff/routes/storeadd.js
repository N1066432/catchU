var express = require('express');
var router = express.Router();

//增加引用函式
const store = require('./utility/store');

//接收POST請求
router.post('/', function(req, res, next) {           
    var storeName = req.body.storeName;              
    var storeAddress = req.body.storeAddress;        
    var phoneNo = req.body.phoneNo;                  
    var vacantTable = Number(req.body.vacantTable);
    var businessHours = req.body.businessHours;
    var wifi = req.body.wifi;
    var socket = req.body.socket;
    var provideMeals = req.body.provideMeals;
    var outsideFood = req.body.outsideFood;
    var chargringStandards = req.body.chargringStandards;

    // 建立一個新資料物件
    var newData={
        storeNamemID:storeName,
        storeAddress:storeAddress,
        phoneNo:phoneNo,
        vacantTable:vacantTable,
        businessHours:businessHours,
        wifi:wifi,
        socket:socket,
        provideMeals:provideMeals,
        outsideFood:outsideFood,
        chargringStandards:chargringStandards
    } 
    
    store.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router; 