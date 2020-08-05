var express = require('express');
var router = express.Router();

//增加引用函式
const store = require('./utility/store');

//接收POST請求
router.post('/', function(req, res, next) {           
    var storename = req.body.storename;              
    var storeaddress = req.body.storeaddress;        
    var phoneno = req.body.phoneno;                  
    var vacanttable = Number(req.body.vacanttable);
    var businesshours = req.body.businesshours;
    var wifi = req.body.wifi;
    var socket = req.body.socket;
    var providemeals = req.body.providemeals;
    var outsidefood = req.body.outsidefood;
    var chargringstandards = req.body.chargringdtandards;

    // 建立一個新資料物件
    var newData={
        storename:storename,
        storeaddress:storeaddress,
        phoneno:phoneno,
        vacanttable:vacanttable,
        businesshours:businesshours,
        wifi:wifi,
        socket:socket,
        providemeals:providemeals,
        outsidefood:outsidefood,
        chargringstandards:chargringstandards
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