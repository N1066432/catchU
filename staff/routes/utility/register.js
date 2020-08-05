'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
//------------------------------------------
//執行資料庫動作的函式-註冊員工帳號
//------------------------------------------
var add = async function(newData){
    var result;
    console.log(newData)
    await sql('INSERT INTO staff ("staffPhone" , "userName" , "password" , "nickName" ) VALUES ($1, $2, $3, $4)', [newData.staffPhone, newData.userName, newData.nickName, newData.password])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
module.exports = {add}