const express = require('express')
const morgan = require('morgan')
const path = require('path')
const createError = require('http-errors')

const app = express()

// settings 
app.set('port', process.env.PORT || 3000)

// middlewares
app.use(morgan('dev'))
app.use(express.json())

// static Files
app.use(express.static(path.join(__dirname, '..', 'public')))


// routes
//app.use(process.env.API_PATH, require('./controllers/authentication.controller'))
// this route is used to redirect to the web page
app.use('*', (req, res, next) => {
    if(!req.originalUrl.includes(process.env.API_PATH))
        res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
    else
        next()
})

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     next(createError(404))
// })

module.exports = app