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
var addend = async function(memberphone){
    var results;
    const current = new Date();
    
    console.log(memberphone)
    //const insertText = 'INSERT INTO calculatingtime("arrivalTime") VALUES ($1)'
    await sql('UPDATE calculatingtime SET endtime = $2  where "timeserNo" =(select max("timeserNo") from calculatingtime where memberphone =$1)', [memberphone, current])
        .then((data) => {
            //console.log(data.rowCount)
            if(data.rowCount > 0){
                results = 1;   
            }else{
                results = -1;
            }                                                                                                                                       
        }, (error) => {
            results = null;
        });
    
    return results;
}

//------------------------------------------
//執行資料庫動作的函式-計算總花費時間
//------------------------------------------
var query = async function(data){
    let result={};
    let minutes;
    let mp=data.memberphone;

    let t =data.ttotal;

    await sql('select * from calculatingtime WHERE memberphone= $1', [data.memberphone])
        .then((data) => {
            result = data.rows[0];  
            //console.log(result.arrivaltime);
            //console.log(result.endtime);

            var dt1 = new Date(result.arrivaltime);
            var dt2 = new Date(result.endtime);

            var diff =(dt2.getTime() - dt1.getTime()) / 60000;
            minutes = Math.abs(Math.round(diff));            
            //console.log(minutes);

        }, (error) => {
            //console.log("error")
            result = -1;
        });

    await sql('update calculatingtime set staymins= $1 WHERE memberphone= $2', [minutes, mp])   
        .then((data) => {
            result = data.rows; 
        }, (error) => {
            result = -1;
        });
    
    //----------------------------------
    // 計算遊玩所花費的金額
    //----------------------------------
    await sql('select * from calculatingtime WHERE memberphone= $1', [data.memberphone])
        .then((data) => {
            result = data.rows[0];   
            //console.log(result.staymins)          
        }, (error) => {
            //console.log("error")
            result = -1;
        });
    
    await sql('select * from storeinformation')
        .then((data) => {
            result = data.rows[0];

            var staymins = result.staymins;
            var atime = result.atime;
            var apoint = result.apoint;
            var addapoint = result.addapoint; 

            if(staymins >= atime){
                t = staymins * apoint;
            }else{
                t = staymins * addapoint;
                result = -1;
            }
            console.log(result)
            console.log(apoint)
            console.log(addapoint)
            console.log(atime)
            console.log(t)
           
        }, (error) => {
            console.log("error")
            result = null;
        });

    await sql('update calculatingtime set ttotal= $1 WHERE memberphone= $2', [t, mp])   
        .then((data) => {
            result = data.rows; 
            console.log(data.rows)
        }, (error) => {
            result = -1;
        });
    
    
    return result;
}



module.exports = {add, addend, query};