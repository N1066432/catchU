'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const session = require('express-session');

//------------------------------------------
//執行資料庫動作的函式-查看會員資料
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

//------------------------------------------
//執行資料庫動作的函式-取出單一員工
//------------------------------------------
var list = async function(memberphone,ordtime){
    var result={};
    
    await sql('SELECT * FROM orderdetail WHERE memberphone = $1 and ordtime = $1', [memberphone,ordtime])
    .then((data) => {
        console.log(data.rows.length)
        console.log(data.rows)

        if(data.rows.length > 0){
            result = data.rows;   
        }else{
            result = -1;
        }    
    }, (error) => {
        result = null;
    });
    
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-新增會員資料
//------------------------------------------

var add = async function(newData){
    var result;
    console.log(newData)
    console.log(newData.foodid)
    console.log(newData.foodno)
    console.log(newData.customized)
    console.log(newData.memberphone)
    console.log(newData.tableno)
    console.log(newData.ordtime)

    const current = new Date();

    await sql('INSERT INTO orderdetail (foodid, foodno, customized, memberphone, tableno, ordtime)  VALUES ($1, $2, $3, $4, $5, $6)', [newData.foodid, newData.foodno, newData.customized, newData.memberphone, newData.tableno, current])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//----------------------------------
// 刪除會員資料
//----------------------------------
var remove = async function(orderdetailid){
    var result;

    await sql('DELETE FROM orderdetail WHERE "orderdetailid" = $1', [orderdetailid])
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
    
    await sql('SELECT * FROM orderdetail WHERE "orderdetailid" = $1', [orderdetailid])
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

    const current = new Date();

    await sql('UPDATE orderdetail SET "foodid"=$2, "foodno"=$3, "customized"=$4, "memberphone"=$5, "tableno"=$6, "ordtime"=$7 WHERE "orderdetailid" = $1', [newData.orderdetailid, newData.foodid, newData.foodno, newData.customized, newData.memberphone, newData.tableno, current])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
module.exports = {list, add, remove, query, update}
