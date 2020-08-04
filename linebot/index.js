"use strict";

const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const {Text, Card, Image, Suggestion, Payload} = require('dialogflow-fulfillment'); 
const app = express()

//增加引用模組
const menu = require('./utility/menu');
const member = require('./utility/member');

//============================
// 處理各種意圖
//============================
app.post('/dialogflow', express.json(), (request, response) => {
    //回覆訊息的代理人
    const agent = new WebhookClient({request, response})

    //------------------
    // 處理歡迎意圖
    //------------------   
    function welcome(){
        //回覆文字
        agent.add('你好!!');

        agent.add('request.body:'+JSON.stringify(request.body));        
        agent.add('傳入訊息:'+request.body.queryResult.queryText);
        agent.add('action:'+request.body.queryResult.action);
        agent.add('parameters:'+request.body.queryResult.parameters);
        agent.add('userId:'+request.body.originalDetectIntentRequest.payload.data.source.userId);
        agent.add('timestamp:'+request.body.originalDetectIntentRequest.payload.data.timestamp);
    }


    //------------------
    // 處理加入會員意圖
    //------------------  
    function memberJoin(){
        //回覆文字
        agent.add('歡迎你!!');

        //取得會員的LineID
        var lineid = request.body.originalDetectIntentRequest.payload.data.source.userId;
        var phoneno = request.body.queryResult.parameters.phoneno;
        var name = request.body.queryResult.parameters.name;

        //呼叫customer模組, 寫入會員資料
        return member.add(phoneno, name, lineid).then(data => {  
            if (data == -9){
                //回覆文字
                agent.add('喔, 你的會員原本就存在!');

                //加一張貼圖
                var lineMessage = {
                    "type": "sticker",
                    "packageId": "1",
                    "stickerId": "13"
                };
                
                var payload = new Payload('LINE', lineMessage, {sendAsMessage: true});
                agent.add(payload);   
            }else if(data == 0){   
                //回覆文字            
                agent.add('會員已建立!');    
                agent.add('可填寫[姓名]及[email]收到我們的訊息!'); 
                agent.add('只要用以下格式填寫即可:'); 
                agent.add('姓名:XXX');
                agent.add('email:xxx@xxx.xxx.xxx');

                //加一張貼圖
                var lineMessage = {
                    "type": "sticker",
                    "packageId": "1",
                    "stickerId": "5"
                };
                
                var payload = new Payload('LINE', lineMessage, {sendAsMessage: true});
                agent.add(payload);                                 
            }else{
                agent.add('會員處理發生例外問題!');
            }  
        });
    }

    //-----------------------
    // 處理填寫會員姓名意圖
    //-----------------------     
    function fillmemberName(){
        //取得會員LineID
        var lineid = request.body.originalDetectIntentRequest.payload.data.source.userId;

        //取得會員姓名
        var name = request.body.queryResult.parameters.name;

        //回覆文字
        agent.add('歡迎你!!' + name);

        //呼叫customer模組, 填入客戶姓名
        return customer.fillName(id, name).then(data => {  
            if (data == -9){
                //回覆文字             
                agent.add('喔, 填寫錯誤!');

                //加一張貼圖
                var lineMessage = {
                    "type": "sticker",
                    "packageId": "1",
                    "stickerId": "3"
                };
                
                var payload = new Payload('LINE', lineMessage, {sendAsMessage: true});
                agent.add(payload);   
            }else if(data == 0){  
                //回覆文字  
                agent.add('尚未加入會員! 可填寫以下加入會員:'); 
                agent.add('想加入會員'); 

                //加一張貼圖
                var lineMessage = {
                    "type": "sticker",
                    "packageId": "1",
                    "stickerId": "5"
                };
                
                var payload = new Payload('LINE', lineMessage, {sendAsMessage: true});
                agent.add(payload);                                 
            }else{
                //回覆文字              
                agent.add('已填入姓名!');    

                //加一張貼圖
                var lineMessage = {
                    "type": "sticker",
                    "packageId": "1",
                    "stickerId": "2"
                };
                
                var payload = new Payload('LINE', lineMessage, {sendAsMessage: true});
                agent.add(payload); 
            }  
        });
    }    


    //-----------------------  
    // 處理查看菜單意圖
    //-----------------------      
    function checkmenu(agent){
        //回覆文字
        agent.add('以下是分類菜單!!');
        //回覆文字
        agent.add('以下是分類菜單!!');

        //產生一個圖片選單
        var lineMessage = {
            "type": "template",
            "altText": "一個圖片選單",
            "template": {
                "type": "image_carousel",
                "columns": [               
                    {
                        "imageUrl": "https://tomlin-app-1.herokuapp.com/imgs/f01.jpg",
                        "action": {
                            "type": "message",
                            "label": "查看披薩",
                            "text": "列出披薩菜單"
                        }
                    }, {
                        "imageUrl": "https://tomlin-app-1.herokuapp.com/imgs/f02.jpg",
                        "action": {
                            "type": "message",
                            "label": "查看麵類",
                            "text": "列出麵菜單"
                        }
                    }, {
                        "imageUrl": "https://tomlin-app-1.herokuapp.com/imgs/f04.jpg",
                        "action": {
                            "type": "message",
                            "label": "查看飯類",
                            "text": "列出飯菜單"
                        }
                    }
                ]
            }
        };
                
        var payload = new Payload('LINE', lineMessage, {sendAsMessage: true});
        agent.add(payload);   
    }


    //----------------------- 
    // 處理查看分類菜單意圖
    //-----------------------      
    function listACategory(){
        //取得分類
        var food = request.body.queryResult.parameters.foodid;

        //回覆文字
        agent.add('查看的分類是:' + food);   

        //呼叫menu模組, 取出分類菜單
        return food.listACategory(foodid).then(data => {
            if (data == -9){
                //回覆文字            
                agent.add('喔, 讀取資料錯誤(程式或資料庫出錯)!'); 
            }else if(data.length == 0){
                //回覆文字              
                agent.add('喔, 目前沒有內容!');
  
                //回覆貼圖   
                var lineMessage = {
                    "type": "sticker",
                    "packageId": "1",
                    "stickerId": "3"
                };
                    
                var payload = new Payload('LINE', lineMessage, {sendAsMessage: true});
                agent.add(payload);   
            }else {   
                var cs = []

                //回覆圖文選單 
                for(var i=0; i<data.length; i++){
                    cs.push({
                        "thumbnailImageUrl": data[i].picture,
                        "imageBackgroundColor": "#FFFFFF",
                        "title": data[i].title,
                        "text": data[i].description,
                        "actions": [{
                            "type": "message",
                            "label": "訂1份",
                            "text": "點餐" + data[i].id + "共1份"
                        },
                        {
                            "type": "message",
                            "label": "訂2份",
                            "text": "點餐" + data[i].id + "共2份"
                        }]
                    })                    
                }   

                var lineMessage = {
                    "type": "template",
                    "altText": "這是一個Carousel圖文選單樣板",
                    "template": {
                        "type": "carousel",
                        "columns":cs,
                        "imageAspectRatio": "square",
                        "imageSize": "cover"
                    }
                };
                        
                var payload = new Payload('LINE', lineMessage, {sendAsMessage: true});
                agent.add(payload); 
            }
        });    
    }
    
    
    //-----------------------------
    // 設定對話中各個意圖的函式對照
    //-----------------------------
    let intentMap = new Map();
    
    intentMap.set('Default Welcome Intent', welcome);       //歡迎意圖
    intentMap.set('member join', memberJoin);           //加入會員意圖
    intentMap.set('fill member name', fillmemberName);  //填入會員姓名意圖
    intentMap.set('check menu', checkmenu);                 //查看菜單意圖 
    intentMap.set('list a category', listACategory);        //查看分類菜單
    
    agent.handleRequest(intentMap);
})


//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function() {
    const port = server.address().port;
    console.log("正在監聽埠號:", port);
});