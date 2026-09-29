import { NextFunction } from "express";

const errorHandler = (
  err: Error & { statusCode?: number; isOperational?: boolean },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? "Something went wrong" : err.message,
  });
};
