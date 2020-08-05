var express = require('express');
var router = express.Router();

//增加引用函式
const food = require('./utility/food');

//---------------------------
// 引用multer外掛
//---------------------------
const multer  = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/picture');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

// 產生multer的上傳物件
var maxSize=1024*1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage:storage
})
//---------------------------

//接收POST請求
router.post('/',upload.single('picture'), function(req, res, next) {
               
    var itemID = req.body.itemID;                  
    var foodname = req.body.foodname;          
    var foodpoint = Number(req.body.foodpoint);    
    var foodimg;

    // 如果有選擇圖片
    if (typeof(req.file) != 'undefined'){
        picture=req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData={

        itemID:itemID,
        foodname:foodname,
        foodpoint:foodpoint,
        foodimg:foodimg
    } 
    
    food.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;
