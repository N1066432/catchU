'use strict';

//-----------------------
// 引用資料庫模組
//-----------------------
const {Client} = require('pg');

//-----------------------
// 自己的資料庫連結位址
//-----------------------
var pgConn = 'postgres://wnqverydxjmwrm:860dbbb2d0e96d13870d971daeba676d27f3b080237766da31e208314d5cf213@ec2-35-172-73-125.compute-1.amazonaws.com:5432/dcrjf4eha5rvav';

//產生可同步執行query物件的函式
function query(sql, value=null) {
    return new Promise((resolve, reject) => {
        //設定資料庫連線物件
        var client = new Client({
            connectionString: pgConn,
            ssl: true
        })     

        //連結資料庫
        client.connect();

        //回覆查詢結果  
        client.query(sql, value, (err, results) => {                   
            if (err){
                reject(err);
            }else{
                resolve(results);
            }

            //關閉連線
            client.end();
        });
    });
}

//-----------------------
// 匯出函式
//-----------------------
module.exports = query;