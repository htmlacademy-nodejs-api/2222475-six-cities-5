import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';

export class ValidateCurrentUserMiddleware implements Middleware {
  constructor(
    private readonly param: string,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    const userId = params[this.param];
    const authUserId = tokenPayload.id;

    if (userId !== authUserId) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'You cannot edit this user',
        'ValidateCurrentUserMiddleware'
      );
    }

    next();
  }
}
