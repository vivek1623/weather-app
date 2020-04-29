const request = require('request')
const url = require('../url')

const getForecast = (latitude, longitude, callback) => {
  request(
    {
      url: url.weatherStack.getUrl(latitude, longitude),
      json: true
    },
    (err, res) => {
      if (err)
        callback('unable to connect the forecast service.')
      else if (res && res.body && res.body.error)
        callback(res.body.error.info)
      else if (res && res.body && res.body.current) {
        callback(false, res.body.current)
      }
    }
  )
}

module.exports = getForecast
