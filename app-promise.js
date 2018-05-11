const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .alias('version', 'v')
    .argv;

let fromFarenheitToCelcius = (temperature) => {
    return Math.round((temperature-32)/1.8);
};

let encodedAddress = encodeURIComponent(argv.address);

let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    let latitude = response.data.results[0].geometry.location.lat;
    let longitude = response.data.results[0].geometry.location.lng;

    let weatherUrl = `https://api.darksky.net/forecast/941c83b949d52e4e79a3c8bb3877a8aa/${latitude},${longitude}`;

    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data. currently.apparentTemperature;
    console.log(`It's currently ${fromFarenheitToCelcius(temperature)}. It feels like ${fromFarenheitToCelcius(apparentTemperature)}.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message)
    }
});