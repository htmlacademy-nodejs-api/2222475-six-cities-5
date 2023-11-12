import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class NotPrivateRouteMiddleware implements Middleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (tokenPayload) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Unauthorized only',
        'PrivateRouteMiddleware'
      );
    }

    return next();
  }
}
