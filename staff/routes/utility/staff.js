'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有員工資料
//------------------------------------------
var list = async function(){
    var result="";

    //console.log("查詢員工");
    await sql('SELECT * FROM staff')
        .then((data) => {            
            result = data.rows;
            //console.log(result)  ;
        }, (error) => {
            result = null;
            //console.log("除去錯誤")  ;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-新增員工資料
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
//----------------------------------
// 刪除員工
//----------------------------------
var remove = async function(userName){
    var result;

    await sql('DELETE FROM staff WHERE "userName" = $1', [userName])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//------------------------------------------
//執行資料庫動作的函式-取出單一員工
//------------------------------------------
var query = async function(userName){
    var result={};
    
    await sql('SELECT * FROM staff WHERE "userName" = $1', [userName])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];   
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
		
    return result;
}

//----------------------------------
// 更新員工資料
//----------------------------------
var update = async function(newData){
    var results;

    await sql('UPDATE staff SET "staffPhone"=$2, "nickName"=$3, "password"=$4 WHERE "userName" = $1', [newData.userName, newData.staffPhone, newData.nickName, newData.password])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
module.exports = {list, add, remove, query, update}
