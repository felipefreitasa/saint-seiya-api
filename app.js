
const path = require('path')
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const AppError = require('./utils/appError')
const characterRouter = require('./routes/characterRoutes')
const globalErrorHandler = require('./controllers/errorController')

const app = express();

app.use(express.json())

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use(compression());

app.use(cors({
  origin: '*', 
}))

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.hostname + req.url)
    }

    next()
  });
}

app.use('/characters', characterRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app