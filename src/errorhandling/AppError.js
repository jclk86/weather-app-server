class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;
    // Prevents class from showing up in stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;