var express = require('express');
var router = express.Router();

//增加引用函式
const member = require('./utility/member');
var moment = require('moment');
//接收GET請求
router.get('/', function(req, res, next) {
    member.list().then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){
            console.log(data);
            for(var i=0; i<data.length; i++){
                data[i].creationdate=moment(data[i].creationdate).format("YYYY-MM-DD hh:mm:ss")
                data[i].birthday=moment(data[i].birthday).format("YYYY-MM-DD hh:mm:ss")     
            } 
            res.render('member_list', {items:data});  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

module.exports = router;