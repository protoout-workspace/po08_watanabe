'use strict';

const axios = require('axios');

async function main() {
    const url = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?applicationId=1021449798821169301&keyword=coffee&hits=1&format=json"
    const response = await axios.get(url);
    console.log(response.data.Items[0].Item.author);
}

main();
