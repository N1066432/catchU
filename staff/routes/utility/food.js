'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有餐點資料
//------------------------------------------
var list = async function(){
    var result=[];

    console.log("查詢餐點");
    await sql('SELECT * FROM food')
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
// 新增餐點
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO food ( "itemID", "foodName", "foodPoint", "foodImg") VALUES ($1, $2, $3, $4)', [newData.itemID, newData.foodName, newData.foodPoint, newData.foodImg])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//----------------------------------
// 刪除餐點
//----------------------------------
var remove = async function(foodID){
    var result;

    await sql('DELETE FROM food WHERE "foodid" = $1', [foodiD])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//------------------------------------------
//執行資料庫動作的函式-取出單一餐點
//------------------------------------------
var query = async function(foodID){
    var result={};
    
    await sql('SELECT * FROM food WHERE "foodid" = $1', [foodiD])
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
// 更新餐點資料
//----------------------------------
var update = async function(newData){
    var results;
    console.log(newData)
    await sql('UPDATE food SET "itemID"=$2, "foodName"=$3, "foodPoint"=$4, "foodImg"=$5 WHERE "foodid" = $1', [newData.foodid, newData.itemID, newData.foodName, newData.foodPoint, newData.foodImg])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
module.exports = {list, add, remove, query, update}