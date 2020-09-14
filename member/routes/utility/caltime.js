'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const { Client } = require('pg');
const session = require('express-session');

//------------------------------------------
// 新增開始時間
//------------------------------------------
var add = async function(newData){
    var result;

    const current = new Date();
    //const insertText = 'INSERT INTO calculatingtime("arrivalTime") VALUES ($1)'
    
    await sql('INSERT INTO calculatingtime ( "memberphone", "arrivaltime") VALUES ($1, $2)', [newData.memberphone, current])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
// 新增結束時間
//------------------------------------------
var addend = async function(newData){
    var result;

    const current = new Date();
    //const insertText = 'INSERT INTO calculatingtime("arrivalTime") VALUES ($1)'
    
    await sql('INSERT INTO calculatingtime ( "memberphone", "endtime") VALUES ($1, $2)', [newData.memberphone, current])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-尋找到達及結束時間
//------------------------------------------
var query = async function(memberphone){
    var result;

    await sql('SELECT * FROM calculatingtime WHERE memberphone = $1 order by arrivaltime desc', [memberphone])

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


module.exports = {add, addend, query};