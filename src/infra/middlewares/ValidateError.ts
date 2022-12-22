import { NextFunction, Request, Response } from 'express'

import { AppError } from '../../shared/exceptions/AppError';

const ValidateError = ((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details
    });
  }

  console.error(JSON.stringify(err));

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

export default ValidateError
