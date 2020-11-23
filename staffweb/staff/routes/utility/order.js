'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有訂單資料
//------------------------------------------
var list = async function(){
    var result=[];

    console.log("查詢訂單");
    await sql('SELECT * FROM orderdetail WHERE date("ordtime") = date(now()) ORDER BY "ordtime" DESC')
        .then((data) => {            
            result = data.rows;
            console.log(result);
        }, (error) => {
            result = null;
            //console.log("除去錯誤");
        });
		
    return result;
}

module.exports = {list}