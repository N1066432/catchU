'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//---------------------------------
// 加入會員 (寫id到customer資料表)
//---------------------------------
var add = async function(phoneno, name, lineid){
    console.log(phoneno);
    console.log(name);
    console.log(lineid);
    //存放結果
    let result;  

    //寫入資料表
    await query('INSERT INTO member (memberphone, membername, lineid) VALUES ($1, $2, $3)', [phoneno, name, lineid])
        .then((data) => {
            result = 0;   //寫入成功
        }, (error) => {
            result = -9;  //寫入錯誤
        });

    //回傳執行結果
    return result;  
}

//---------------------------------
// 填寫會員姓名
//---------------------------------
var fillName = async function(lineid, name){
    //存放結果
    let result;  

    //寫入資料庫
    await query('UPDATE member SET name = $2 WHERE lineid = $1', [lineid, name])
        .then((data) => {
            result = data.rowCount;   //填寫改變的資料數
        }, (error) => {
            result = -9;  //填寫錯誤
        });

    //回傳執行結果
    return result;  
}

//-----------------------
// 匯出函式
//-----------------------
module.exports = {add, fillName};