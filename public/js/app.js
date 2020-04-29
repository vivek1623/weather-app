const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', event => {
  event.preventDefault()
  const address = searchInput.value
  messageOne.textContent = 'Loading ...'
  messageTwo.textContent = ''
  fetch(`http://localhost:1623/weather?address=${address}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        messageOne.textContent = data.error
        essageTwo.textContent = ''
      }
      else {
        const weatherInfo = `${data.forecast.weather_descriptions[0]}. It is currently ${data.forecast.temperature} degree out and it feels like ${data.forecast.feelslike} degree. `
        messageOne.textContent = data.location
        messageTwo.textContent = weatherInfo
      }
      console.log(data)
    }).catch(error => console.log(error))
})