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
    
    //console.log(memberphone)
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
    let results={};
    let result={};
    let minutes;
    let mp=data.memberphone;

    let t =data.ttotal;
    let glo_staymins;

    let st =data.sumtotal;

    let tp =data.totalpoint;

    let glo_points;
    let glo_confirm;

    await sql('select * from calculatingtime WHERE memberphone= $1 and date(arrivaltime) = current_date and date(endtime) = current_date', [data.memberphone])
        .then((data) => {
            result = data.rows[0];  
            console.log(result.arrivaltime);
            console.log(result.endtime);

            var dt1 = new Date(result.arrivaltime);
            var dt2 = new Date(result.endtime);

            var diff =(dt2.getTime() - dt1.getTime()) / 60000;
            minutes = Math.abs(Math.round(diff));            
            glo_staymins =minutes;

        }, (error) => {
            result = -1;
            console.log("**error01")
        });

    await sql('update calculatingtime set staymins= $1 WHERE memberphone= $2 and date(arrivaltime) = current_date and date(endtime) = current_date', [minutes, mp])   
        .then((data) => {
            result = data.rows; 
        }, (error) => {
            result = -1;
            console.log("**error02")
        });
    
//----------------------------------
// 計算遊玩所花費的金額
//----------------------------------
    await sql('select * from calculatingtime WHERE memberphone= $1 and date(arrivaltime) = current_date and date(endtime) = current_date', [mp])
        .then((data) => {
            results.ttotal = data.rows[0].ttotal;          
        }, (error) => {
            result = -1;
            console.log("**error03")
        });
    
    await sql('select * from storeinformation')
        .then((data) => {
            result = data.rows[0];

            var atime = result.atime;
            var apoint = result.apoint;
            var lessatime = result.lessatime;
            var addapoint = result.addapoint; 

            var h = parseInt(glo_staymins/atime)
            var r =  glo_staymins % atime

            if(r>=lessatime){
                h++;
                r=0;
                t = h * apoint
            }else{
                t = h * apoint + addapoint
            }

            console.log(t)

           results.ttotal =t;
           
        }, (error) => {
            result = null;
            console.log("**error04")
        });
   
    await sql('update calculatingtime set ttotal= $1 WHERE memberphone= $2 and date(arrivaltime) = current_date and date(endtime) = current_date', [t, mp])   
        .then((data) => {
            result = data.rowCount; 
        }, (error) => {
            result = -1;
            console.log("**error05")
        });

//----------------------------------
// 計算餐點費用
//----------------------------------
    await sql('select memberphone, sum(foodpoint) as sumtotal from orderdetail where date(ordtime) = current_date group by orderdetail.memberphone')
        .then((data) => {   
            st = data.rows[0].sumtotal;
            mp = data.rows[0].memberphone;   
            results.sumtotal = st;
            results.memberphone = mp;   
            
        }, (error) => {
            result = -1;
            console.log("**error06")
        });

    await sql('update orderdetail set sumtotal= $1 WHERE memberphone= $2 and date(ordtime) = current_date', [st, mp])   
        .then((data) => {
            result = data.rowCount; 
        }, (error) => {
            result = -1;
            console.log("**error07")
        });

//----------------------------------------
// 判斷是否點餐和計算總花費金額及轉換成點數
//----------------------------------------
    await sql('select * from checkout ')
        .then((data) => {
            result = data.rows[0];

            if(st > 0){
                tp = parseInt(t) + parseInt(st);
            }else{
                tp = t;
                result = -1;
            }
            results.totalpoint=tp;
           
        }, (error) => {
            result = null;
            console.log("**error08")
            console.log(tp)
        });   

    await sql('update checkout set totalpoint= $1 WHERE memberphone= $2', [tp, mp])   
        .then((data) => {
            result = data.rowCount; 
        }, (error) => {
            result = -1;
            console.log("**error09")
        });

//----------------------------------------
// 判斷點數是否足夠及計算剩餘點數
//----------------------------------------
    await sql('select * from member WHERE memberphone= $1', [mp])
        .then((data) => {
            result = data.rows[0];      
            glo_points = result.points;    
        }, (error) => {
            result = -1;
            console.log("**error10")
        });

    await sql('select * from orderdetail WHERE memberphone= $1 and date(ordtime) = current_date', [mp])
        .then((data) => {
            result = data.rows[0];      
            glo_confirm = result.confirm; 
        }, (error) => {
            result = -1;
            console.log("**error11")
        });

    await sql('select * from checkout WHERE memberphone= $1 and date(billtime) = current_date', [mp])
        .then((data) => {
            result = data.rows[0];

            if(glo_points > tp){
                glo_points = glo_points - tp;
                glo_confirm = '是';
            }else{
                glo_confirm = '否';
            }
            console.log(glo_points)
            console.log(glo_confirm)
        
        }, (error) => {
            result = null;
            console.log("**error12")
        });   

    await sql('update member set points= $1 WHERE memberphone= $2', [glo_points, mp])   
        .then((data) => {
            results.rowCount = data.rowCount; 
            console.log(data.rowCount)
        }, (error) => {
            result = -1;
            console.log("**error13")
        });

    await sql('update orderdetail set confirm= $1 WHERE memberphone= $2 and date(ordtime) = current_date', [glo_confirm, mp])   
        .then((data) => {
            results.rowCount = data.rowCount;
            results.glo_confirm = glo_confirm; 
        }, (error) => {
            result = -1;
            console.log("**error14")
        });
        console.log(results)
    return results;
}



module.exports = {add, addend, query};