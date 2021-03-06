'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const { Client } = require('pg');

//------------------------------------------
// 新增開始時間
//------------------------------------------
var add = async function(newData){
    var result;
    console.log(newData.memberphone)
    //console.log(newData.arrivalTime)

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

module.exports = {add}