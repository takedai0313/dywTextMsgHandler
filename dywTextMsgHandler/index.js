'use strict';

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
    
    console.log(replyMsg);
    // TODO implement
    callback();
};

/*
実装したい内容；
アレルギー
音楽
景品

*/