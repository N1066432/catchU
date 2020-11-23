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
// 取出型態資料
//------------------------------------------
var getDropdownData = async function(){
    //儲存下拉式選單資料
    var item;
    
    //取回protype資料
    await sql('SELECT * FROM item ORDER BY "itemID"')
        .then((data) => {
            item = data.rows;  
        }, (error) => {
            result = [];
        });
    
    //設定回傳資料    
    var result = {};
    result.item = item;

    //回傳
    return result;
}

//------------------------------------------
// 取出型態資料
//------------------------------------------
var getfoodnameData = async function(){
    //儲存下拉式選單資料
    var food;
    
    //取回protype資料
    await sql('SELECT * FROM food ORDER BY "foodid"')
        .then((data) => {
            food = data.rows;  
        }, (error) => {
            result = [];
        });
    
    //設定回傳資料    
    var result = {};
    result.food = food;

    //回傳
    return result;
}
//------------------------------------------
// 新增餐點
//------------------------------------------
var add = async function(newData){
    var result;
    console.log(newData)
    await sql('INSERT INTO food ( "itemname", "foodname", "foodpoint", "foodimg") VALUES ($1, $2, $3, $4)', [newData.itemname, newData.foodname, newData.foodpoint, newData.foodimg])
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
var remove = async function(foodid){
    var result;

    await sql('DELETE FROM food WHERE "foodid" = $1', [foodid])
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
var query = async function(foodid){
    var result={};
    await sql('SELECT * FROM food WHERE "foodid" = $1', [foodid])
        .then((data) => {
            if(data.rows.length > 0){
                result.food = data.rows[0];   
            }else{
                result.food = -1;
            }    
        }, (error) => {
            result.food = null;
        });
        
    //取回protype資料
    await sql('SELECT * FROM item ORDER BY "itemID"')
        .then((data) => {
            result.item = data.rows;  
        }, (error) => {
            result.item = [];
        });

    console.log(result)
        
		
    return result;
}

//----------------------------------
// 更新餐點資料
//----------------------------------
var update = async function(newData){
    var results;
    console.log(newData)
    await sql('UPDATE food SET "itemname"=$2, "foodname"=$3, "foodpoint"=$4 WHERE "foodid" = $1', [newData.foodid, newData.itemname, newData.foodname, newData.foodpoint])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
module.exports = {getDropdownData, list, add, remove, query, update, getfoodnameData}