'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');



//------------------------------------------
//執行資料庫動作的函式-取出單一員工
//------------------------------------------
var one = async function(staffphone){
    var result={};
    
    await sql('SELECT * FROM staff WHERE staffphone = $1', [staffphone])
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
//執行資料庫動作的函式-取出單一員工
//------------------------------------------
var query = async function(staffphone){
    var result={};
    
    await sql('SELECT * FROM staff WHERE "staffphone" = $1', [staffphone])
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
// 更新員工資料
//----------------------------------
var update = async function(newData){
    var results;
    console.log(newData)
    await sql('UPDATE staff SET "username"=$2, "nickname"=$3, "password"=$4 WHERE "staffphone" = $1 ', [newData.staffphone, newData.username, newData.nickname, newData.password])
        .then((data) => {
            console.log(newData)
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}
module.exports = {one, query, update}
