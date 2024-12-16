import { Request, Response, NextFunction } from "express";

interface ApiError extends Error {
  statusCode?: number;
  service?: string;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction // required to keep here
): void => {
  const statusCode = err.statusCode || 500;
  const response: Record<string, any> = {
    error: {
      message: err.message || "An unexpected error occurred.",
    },
  };

  if (err.service) {
    response.error.service = err.service;
  }

  console.error(`Error in ${err.service || "application"}:`, err.message);
  res.status(statusCode).json(response);
};
