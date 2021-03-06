'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有結帳明細
//------------------------------------------
var list = async function(){
    var result=[];

    console.log("查詢結帳明細");
    await sql('SELECT * FROM checkout WHERE date("billtime") = date(now()) ORDER BY "billtime" DESC')
        .then((data) => {            
            result = data.rows;
            console.log(result);
        }, (error) => {
            result = null;
            //console.log("除去錯誤")  ;
        });
		
    return result;
}

module.exports = {list}