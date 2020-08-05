'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有類別資料
//------------------------------------------
var list = async function(){
    var result=[];

    console.log("查詢類別");
    await sql('SELECT * FROM item ORDER BY "itemID" ')
        .then((data) => {            
            result = data.rows;
            console.log(result)  ;
        }, (error) => {
            result = null;
            //console.log("除去錯誤")  ;
        });
		
    return result;
}
//------------------------------------------
// 新增類別
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO item ("itemname") VALUES ($1)', [newData.itemname])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//----------------------------------
// 刪除類別
//----------------------------------
var remove = async function(itemID){
    var result;

    await sql('DELETE FROM item WHERE "itemID" = $1', [itemID])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//------------------------------------------
//執行資料庫動作的函式-取出單一類別
//------------------------------------------
var query = async function(itemID){
    var result={};
    
    await sql('SELECT * FROM item WHERE "itemID" = $1', [itemID])
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
// 更新類別資料
//----------------------------------
var update = async function(newData){
    var results;
    console.log(newData)
    await sql('UPDATE item SET "itemname"=$2 WHERE "itemID" = $1', [newData.itemID, newData.itemname])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
module.exports = {list, add, remove, query, update}