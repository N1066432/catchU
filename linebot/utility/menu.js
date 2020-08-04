'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

//-------------------
// 查看分類菜單
//-------------------
var listACategory = async function(foodid){
    //存放結果
    let result;  

    //讀取資料庫
    await query('SELECT * FROM food WHERE foodid = $1', [foodid])
        .then((data) => {
            result = data.rows;   //查詢成功
        }, (error) => {
            result = -9;          //查詢失敗
        });

    //回傳執行結果
    return result;  
}

//-----------------------
// 匯出函式
//-----------------------
module.exports = {listACategory};