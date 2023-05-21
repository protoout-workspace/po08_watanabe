const axios = require('axios');

// 調べたいタグ名を入力する
const tag = 'axios';
// 日本語タグでも叩ける形に変換
const encodedTag = encodeURI(tag);

// アクセストークンを入力する
const access_token = process.env.ACCESS_TOKEN || 'groCchER8ObhpYepZDit9ZXh3OTorSozEcs0bGoMA49';

const getTagData = async() => {
    // 叩くAPIを変えるときは、getの中を変えましょう
    const res = await axios.get(`https://qiita.com/api/v2/tags/${encodedTag}`);
    return res.data;
}

const main = async() => {
    // タグのデータを取得している部分
    const tagData = await getTagData();

    // フォロワー数を返している部分。返す情報を変えるときはこの部分を変えましょう。
    const followersCount = tagData.followers_count;
    const message = `${tag}のフォロワー数は${followersCount}人です。`;
    sendNotify(message, access_token);
}

main();

/**
 * ********************************
 * ここから下は触らなくて大丈夫です。*
 * ********************************
 */
const sendNotify = async(message, access_token) => {
    // これがLINE NotifyのAPIです。ここでもAPIを叩いています。
    const url = 'https://notify-api.line.me/api/notify';
    const data = {message};
    const config = { 
        "headers": {
            "Content-Type": 'application/x-www-form-urlencoded',
            "Authorization": `Bearer ${access_token}`,
        }
    };
    const res = await axios.post(url, data, config);
    console.log(res);
}