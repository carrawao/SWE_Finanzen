const axios = require('axios');
const fs = require('fs');

const updateCurrentCurrency = async (apiKey) => {
    console.log("update current Currency");
    url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}`
    axios.get(url)
        .then(res => res.data)
        .then(data => {
            fs.writeFileSync('data/Currency/currentCurrency.json',JSON.stringify(data));
        })
        .catch(error => {console.error(error)});
    console.log("Finish update current Curency");
}

module.exports = {
    updateCurrentCurrency
}
