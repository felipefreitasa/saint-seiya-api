const path = require('path')
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const AppError = require('./utils/appError')
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = require("./swaggerConfig")
const characterRouter = require('./routes/characterRoutes')
const globalErrorHandler = require('./controllers/errorController')

const app = express();

const allowedOrigins = process.env.NODE_ENV === 'production'
? ["https://saintseiyaapi.com", "https://saintseiyaapi-71b85b0cc3ba.herokuapp.com"]
: ["http://localhost:3000", "http://127.0.0.1:3000"]; 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(express.json())

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use(compression());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.hostname + req.url)
    }

    next()
  });
}

app.use('/api/characters', characterRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app;
