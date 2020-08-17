'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');
const session = require('express-session');
var add = async function(newData){
    var result;

    const current = new Date();

    await sql('INSERT INTO topup ("memberphone" , "staffphone" , "topup", "topuppoints", "topuptime") VALUES ($1, $2, $3, $4, $5)', [newData.memberphone, newData.staffphone, newData.topup, newData.topuppoints, current])
        .then((data) => {
            result = 0;  
        }, (error) => {
            return -1;
        });

	await sql('UPDATE member SET "points" = "points" + $2 WHERE "memberphone"=$1', [newData.memberphone, newData.topuppoints])
        .then((data) => {
            result = data.rowCount;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

module.exports = {add}
