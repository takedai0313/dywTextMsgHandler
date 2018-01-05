'use strict';

const fs = require("fs");
const invokeLambda = (JSON.parse(fs.readFileSync(process.env.setting, 'utf8'))).invokeLambda;
const replyMessages = (JSON.parse(fs.readFileSync(process.env.setting, 'utf8'))).reply;
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda({
    apiVersion: '2015-03-31',
    region: 'ap-northeast-1'
});

exports.handler = (event, context, callback) => {
    console.log(event);
    let replyMsg;
    const msg = event.events[0].message.text;
    
    switch(true){
        case /おめで/.test(msg):
            replyMsg = replyMessages[1];
            break;
        case /日にち/.test(msg):
            replyMsg = replyMessages[2];
            break;
        case /時間/.test(msg):
            replyMsg = replyMessages[3];
            break;
        default:
            replyMsg = replyMessages[0];
            break;
    }
    
    const param = {
        replyToken: event.events[0].replyToken,
        msg: replyMsg
    };
    
    // Line返答を行うlambdaを呼び出す
    const invokeparam = {
        FunctionName: invokeLambda,
        InvocationType: "Event",
        Payload: new Buffer(JSON.stringify(param)).toString()
    };
    lambda.invoke(invokeparam, (err, data) => {
        if(err)   console.log(err, err.stack);
        else      console.log(data);
    });
    
    console.log(replyMsg);
    // TODO implement
    callback(null);
};

/*
実装したい内容；
アレルギー
音楽
景品

*/