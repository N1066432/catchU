'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有店家資訊
//------------------------------------------
var list = async function(){
    var result=[];

    //console.log("查詢店家資訊");
    await sql('SELECT * FROM storeinformation')
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
// 新增店家資訊
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO storeinformation ("storename", "storeaddress", "phoneno", "vacanttable", "businesshours", "wifi", "socket", "providemeals", "outsidefood", "chargingstandards", "atime", "apoint", "lessatime", "addapoint") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)', [newData.storename, newData.storeaddress, newData.phoneno, newData.vacanttable, newData.businesshours, newData.wifi, newData.socket, newData.providemeals,newData.outsidefood, newData.chargingstandards, newData.atime, newData.apoint, newData.lessatime, newData.addapoint])
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
var remove = async function(storeID){
    var result;

    await sql('DELETE FROM storeinformation WHERE "storeID"= $1', [storeID])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//------------------------------------------
//執行資料庫動作的函式-取出單一店家資訊
//------------------------------------------
var query = async function(storeID){
    var result={};
    
    await sql('SELECT * FROM storeinformation WHERE "storeID" = $1', [storeID])
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
// 更新店家資料
//----------------------------------
var update = async function(newData){
    var results;

    await sql('UPDATE storeinformation SET "storename"=$2, "storeaddress"=$3, "phoneno"=$4, "vacanttable"=$5, "businesshours"=$6, "wifi"=$7, "socket"=$8, "providemeals"=$9, "outsidefood"=$10, "chargingstandards"=$11, "atime"=$12, "apoint"=$13, "lessatime"=$14, "addapoint"=$15 WHERE "storeID" = $1', [newData.storeID, newData.storename, newData.storeaddress, newData.phoneno, newData.vacanttable, newData.businesshours, newData.wifi, newData.socket, newData.providemeals, newData.outsidefood, newData.chargingstandards, newData.atime, newData.apoint, newData.lessatime, newData.addapoint])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
module.exports = {list, add, remove, query, update}
