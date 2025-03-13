
const path = require('path')
const express = require('express')
const AppError = require('./utils/appError')
const characterRouter = require('./routes/characterRoutes')
const globalErrorHandler = require('./controllers/errorController')

const app = express();

app.use(express.json())

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/api/v1/characters', characterRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app