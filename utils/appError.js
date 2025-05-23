class AppError extends Error {
  constructor(message, statusCode){
    super(message)

    this.isOperational = true
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'failure' : 'error' 

    Error.captureStackTrace(this, this.constructor)
  } 
}

module.exports = AppError