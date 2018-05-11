const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

function fromFarenheitToCelcius(temperature) {
    return Math.round((temperature-32)/1.8);
}

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

geocode.geocodeAddress(argv.address, (errorMessage, geocodeResults) => {
    if (errorMessage) {
        console.log(`Error: ${errorMessage}`);
    } else {
        weather.getWeather(geocodeResults.latitude, geocodeResults.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(`Error: ${errorMessage}`);
            } else {
                console.log(`It's currently ${fromFarenheitToCelcius(weatherResults.temperature)}. It feels like ${fromFarenheitToCelcius(weatherResults.apparentTemperature)}.`);
            }
        });
    }
});