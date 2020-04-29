//WEATHER STACK

const weatherStack = {
  baseUrl: 'http://api.weatherstack.com/',
  accessKey: 'fc8703839ed59ba72b445bb7df659976',
  units: 'm',
  getUrl(latitude, longitude) {
    return `${this.baseUrl}current?access_key=${this.accessKey}&query=${latitude},${longitude}&units=${this.units}`
  }
}


//MAP BOX

const mapBox = {
  baseUrl: 'https://api.mapbox.com/',
  accessToken: 'pk.eyJ1Ijoidml2ZWsxNjIzIiwiYSI6ImNrOWgwbDZhNjA4OWwzZ213czg3bzQ3OGIifQ.6gngWMolK7JT5CUykcPhLw',
  limit: 1,
  getUrl(address) {
    return `${this.baseUrl}geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${this.accessToken}&limit=${this.limit}`
  }
}

module.exports = {
  weatherStack,
  mapBox
}
