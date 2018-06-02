const request = require('request')

let geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address)

  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback(undefined, 'Unable to connect to Google servers.')
    } else if (body.status === 'ZERO_RESULTS') {
      callback(undefined, 'Unable to find address.')
    } else if (body.status === 'OVER_QUERY_LIMIT') {
      callback(undefined, 'Too many geo-queries.')
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  })
}

module.exports.geocodeAddress = geocodeAddress
