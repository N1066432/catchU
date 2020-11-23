'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有會員資料
//------------------------------------------
var list = async function(){
    var result="";

    //console.log("查看會員資訊");
    await sql('SELECT * FROM orderdetail')
        .then((data) => {            
            result = data.rows;
            //console.log(result)  ;
        }, (error) => {
            result = null;
            //console.log("除去錯誤")  ;
        });
		
    return result;
}

//----------------------------------
// 刪除會員資料
//----------------------------------
var remove = async function(orderdetailid){
    var result;

    await sql('DELETE FROM orderdetail WHERE orderdetailid = $1', [orderdetailid])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-取得一個會員資料
//------------------------------------------
var query = async function(orderdetailid){
    var result={};
    
    await sql('SELECT * FROM orderdetail WHERE orderdetailid = $1', [orderdetailid])
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
// 更新會員資料
//----------------------------------
var update = async function(newData){
    var results;

    await sql('UPDATE orderdetail SET foodid=$1, foodno=$2, customized=$3, ordtime=$4 WHERE orderdetailid = $5', [newData.foodid, newData.foodno, newData.customized,  newData.ordtime, newData.orderdetailid])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
module.exports = {list, remove, query, update}
