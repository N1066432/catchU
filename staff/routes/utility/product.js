'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var list = async function(foodID){
    var result=[];

    console.log("查詢菜單");
    await sql('SELECT * FROM food ORDER BY foodID')
        .then((data) => {            
            result = data.rows;
            console.log(result)  ;
        }, (error) => {
            result = null;
            console.log("除去錯誤")  ;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var one = async function(prono){
    var result={};
    
    await sql('SELECT * FROM product WHERE prono = $1', [prono])
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

//---------------------------------------------
//執行資料庫動作的函式-傳回分頁及指定頁面的產品
//---------------------------------------------
var page = async function(pageNo){
    const linePerPage = 15;    //設定每頁資料筆數
    const navSegments = 10;    //設定導覽列顯示分頁數
    const startPage = Math.floor((pageNo-1) / navSegments) * navSegments + 1;  //計算導覽列的起始頁數

    var totalLine, totalPage;
    var result = {};

    await sql('SELECT count(*) AS cnt FROM product')
        .then((data) => {
            totalLine = data.rows[0].cnt;
            totalPage = Math.ceil(totalLine/linePerPage);   
        }, (error) => {
            totalLine = 0;
            totalPage = 0;  
        });

    await sql('SELECT * FROM product ORDER BY prono LIMIT $2 OFFSET $1', [(pageNo-1)*linePerPage, linePerPage])
        .then((data) => {
            result = {data:data.rows, pageNo:pageNo, totalLine:totalLine, totalPage:totalPage, startPage:startPage, linePerPage:linePerPage, navSegments:navSegments};  
        }, (error) => {
            result = null;
        });

    return result;
}
//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var query = async function(prono){
    var result={};
    
    await sql('SELECT * FROM product WHERE prono = $1', [prono])
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
//------------------------------------------
//執行資料庫動作的函式-新增產品資料
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO product (prono, proname, price, inventorydate) VALUES ($1, $2, $3, $4)', [newData.prono, newData.proname, newData.price, newData.inventorydate])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//------------------------------------------
// 取出型態資料
//------------------------------------------
var getDropdownData = async function(){
    //儲存下拉式選單資料
    var protype;
    
    //取回protype資料
    await sql('SELECT * FROM protype ORDER BY typno')
        .then((data) => {
            protype = data.rows;  
        }, (error) => {
            result = [];
        });
    
    //設定回傳資料    
    var result = {};
    result.protype = protype;

    //回傳
    return result;
}

//------------------------------------------
// 新增商品
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO product (prono, proname, typno, price) VALUES ($1, $2, $3, $4)', [newData.prono, newData.proname, newData.typno, newData.price])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//----------------------------------
// 刪除商品
//----------------------------------
var remove = async function(prono){
    var result;

    await sql('DELETE FROM product WHERE prono = $1', [prono])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}
//----------------------------------
// 更新商品
//----------------------------------
var update = async function(newData){
    var results;

    await sql('UPDATE product SET proname=$1, price=$2, inventorydate=$3 WHERE prono = $4', [newData.proname, newData.price, newData.inventorydate, newData.prono])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}

//匯出
module.exports = {list, one, page, query, add, getDropdownData, add, remove, update};