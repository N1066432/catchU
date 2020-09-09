var express = require('express');
var router = express.Router();

//增加引用函式
const product = require('./utility/product');

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
router.post('/', upload.single('picture'), function(req, res, next) {
    // 如果有選擇圖片
    if (typeof req.file != 'undefined'){
        // 傳入檔案不可超過maxSize
        if(req.file.size > maxSize){
            res.render('fileSizeError');  //圖片過大
            return;
        }                      
    }  

    var prono = req.body.prono;            //取得產品編號
    var proname = req.body.proname;        //取得產品名稱
    var typno = req.body.typno;            //取得型態編號    
    var price = Number(req.body.price);    //取得價格
    var picture;                           //用來存放圖片名稱

    // 如果有選擇圖片
    if (typeof(req.file) != 'undefined'){
        picture=req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData={
        prono:prono,
        proname:proname,
        typno:typno,
        price:price,
        picture:picture
    } 
    
    // 新增商品
    product.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;