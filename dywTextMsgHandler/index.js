'use strict';

const fs = require("fs");
const invokeLambda = (JSON.parse(fs.readFileSync(process.env.setting, 'utf8'))).invokeLambda;
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
            replyMsg = "ありがとう！当日皆様が楽しめるように頑張ります！";
            break;
        case /日にち/.test(msg):
            replyMsg = "式の日にちかな？2018年の6月9日にやります！";
            break;
        case /時間/.test(msg):
            replyMsg = "式は16時、披露宴は18時半から予定です";
            break;
        default:
            replyMsg = "ごめんね、簡単な質問にしか答えられないよ";
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