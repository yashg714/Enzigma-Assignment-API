function errorHandler(err,req,res,next){
    console.error(err.stack);
    const statusCode = err.status || 500;
    const response = {
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Internal Server Error',
    };
    res.status(statusCode).json(response);
  }
  
module.exports = errorHandler;