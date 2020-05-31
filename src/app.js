const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('../src/utils/forecast')
const geocode = require('../src/utils/geocode')

const app = express()

// Define path for Express config
const publicFolder = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup for views folder
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup for static folder
app.use(express.static(publicFolder))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Hello World !',
        name: 'Belly Brata'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Belly Brata'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Belly Brata',
        content: 'Can I help You?'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            errorMessage: 'You must provide an address'
        })
    }

    geocode( req.query.address , (err, {lat, long, location} = {} ) => {
        if(err){
            return res.send({
                errorMessage: err
            })
        }

        forecast(lat, long, (error, forecastData) => {
            if(error){
                return res.send({
                    errorMessage: err
                })
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
    
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Belly Brata',
        content: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Not Found',
        name: 'Belly Brata',
        content: '404 Page Not found !'
    })
})

app.listen( 3000, () => {
    console.log('Listening on port 3000.')
})