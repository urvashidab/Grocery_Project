class AppError extends Error {
  statusCode: Number;
  isOperational: boolean;

  constructor(message: string, statusCode: Number) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
