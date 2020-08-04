'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有會員資料
//------------------------------------------
var list = async function(){
    var result="";

    //console.log("查看會員資訊");
    await sql('SELECT * FROM food')
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
//執行資料庫動作的函式-新增會員資料
//------------------------------------------

var add = async function(newData){
    var result;
    console.log(newData)
    console.log(newData.memberphone)
    console.log(newData.foodid)
    console.log(newData.foodno)
    console.log(newData.customized)
    console.log(newData.orderdetailid)
    console.log(newData.orderid)
    console.log(newData.ordtime)
    await sql('INSERT INTO orderdetail (memberphone, foodid, foodno, customized, ordtime)  VALUES ($1, $2, $3, $4, $5)', [newData.memberphone, newData.foodid, newData.foodno, newData.customized, newData.ordtime])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

module.exports = {list, add}
