const request = require('request')

let getWeather = (latitude, longitude, callback) => {
  request({
    url: `https://api.darksky.net/forecast/941c83b949d52e4e79a3c8bb3877a8aa/${latitude},${longitude}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log(error)
    } else if (response.status === 200 || response.status === 400) {
      callback(undefined, 'Unable to fetch weather.')
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    }
  })
}

module.exports.getWeather = getWeather
