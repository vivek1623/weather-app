const request = require('request')
const url = require('../url')

const getGeocode = (address, callback) => {
  request({
    url: url.mapBox.getUrl(address),
    json: true
  }, (err, res) => {
    if (err)
      callback('unable to connect the location service.')
    else if (res && res.body && res.body.features && res.body.features.length === 0)
      callback('Unable to find location. try another search.')
    else if (res && res.body && res.body.features) {
      const data = {
        longitude: res.body.features[0].center[0],
        latitude: res.body.features[0].center[1],
        location: res.body.features[0].place_name
      }
      callback(false, data)
    }
  })
}

module.exports = getGeocode

