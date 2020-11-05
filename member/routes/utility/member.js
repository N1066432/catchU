'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有會員資料
//------------------------------------------
var list = async function(){
    var result="";

    //console.log("查看會員資訊");
    await sql('SELECT * FROM member')
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
var one = async function(memberphone){
    var result={};
    
    await sql('SELECT * FROM member WHERE memberphone = $1', [memberphone])
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
//執行資料庫動作的函式-新增會員資料
//------------------------------------------
var add = async function(newData){
    var result;

    console.log(newData)
    console.log(newData.memberphone)
    console.log(newData.password)
    console.log(newData.membername)
    console.log(newData.gender)
    console.log(newData.birthday)
    //console.log(newData.creationdate)

    const current = new Date();

    await sql('INSERT INTO member (memberphone, password, membername, gender, birthday, creationdate) VALUES ($1, $2, $3, $4, $5, $6)', [newData.memberphone, newData.password, newData.membername, newData.gender, newData.birthday, current])
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
var remove = async function(memberphone){
    var result;

    await sql('DELETE FROM member WHERE memberphone = $1', [memberphone])
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
var query = async function(memberphone){
    var result={};
    
    await sql('SELECT * FROM member WHERE memberphone = $1', [memberphone])
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

    await sql('UPDATE member SET membername=$2, password=$3, gender=$4, birthday=$5, creationdate=$6  WHERE memberphone = $1', [newData.memberphone, newData.membername, newData.password, newData.gender, newData.birthday, current])
        .then((data) => {
            results = data.rowCount;  
        }, (error) => {
            results = -1;
        });
		
    return results;
}

module.exports = {list, one, add, remove, query, update}