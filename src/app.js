const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getGeocode = require('./utils/getGeocode')
const getForecast = require('./utils/getForecast')

const app = express()

const port = process.env.PORT || 1623

// to set the hbs as view engine in app for dynamic changes of html

app.set('view engine', 'hbs')

// ----------------------------------

//By default views should be inside views folder (root of project). 
// To change custom folder to define view 

const viewDirPath = path.join(__dirname, '../templates/views') // define path for express config
app.set('views', viewDirPath)

//-----------------------------------

// to register partials in hbs

const partialsDirPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsDirPath)

//-----------------------------------


//setup static directory to serve

const publicDirPath = path.join(__dirname, '../public') // define path for express config
app.use(express.static(publicDirPath))

//-----------------------------------

//Routers

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'vivek vaibhav'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'vivek vaibhav'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'vivek vaibhav'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address)
    return res.send({
      error: "You must provide address to get weather information."
    })
  getGeocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error)
      return res.send({ error })
    getForecast(latitude, longitude, (error, forecast) => {
      if (error)
        return res.send({ error })
      res.send({
        address: req.query.address,
        forecast,
        location
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help articles',
    name: 'vivek vaibhav',
    message: 'Help articles page not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'vivek vaibhav',
    message: 'Page not found'
  })
})

//-----------------------------------

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})