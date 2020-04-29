const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const imgContainer = document.querySelector('#img-container')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

var imgTag = document.createElement("IMG")
imgTag.setAttribute("width", "150")
imgTag.setAttribute("height", "150")
imgTag.setAttribute("alt", "Weather")
imgContainer.appendChild(imgTag)
imgContainer.style.display = 'none'

weatherForm.addEventListener('submit', event => {
  event.preventDefault()
  const address = searchInput.value
  messageOne.textContent = 'Loading ...'
  messageTwo.textContent = ''
  imgContainer.style.display = 'none'
  fetch(`/weather?address=${address}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error
        essageTwo.textContent = ''
      }
      else {
        if (data.forecast.weather_icons && data.forecast.weather_icons.length > 0) {
          const imgSrc = data.forecast.weather_icons[0]
          imgTag.setAttribute("src", imgSrc)
          imgContainer.style.display = 'block'
        }
        const weatherInfo = `${data.forecast.weather_descriptions[0]}. It is currently ${data.forecast.temperature} degree out and it feels like ${data.forecast.feelslike} degree. The humidity is ${data.forecast.humidity}%.`
        messageOne.textContent = data.location
        messageTwo.textContent = weatherInfo
      }
      console.log(data)
    }).catch(error => console.log(error))
})