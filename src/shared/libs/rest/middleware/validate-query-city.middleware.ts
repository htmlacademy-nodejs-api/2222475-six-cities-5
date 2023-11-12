import { NextFunction, Request, Response } from 'express';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { StatusCodes } from 'http-status-codes';
import { CITIES } from '../../../../const.js';

export class ValidateQueryCityMiddleware implements Middleware {

  public execute({ query }: Request, _res: Response, next: NextFunction): void {
    if(!query.city) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        'Query city is required',
        'ValidateQueryCityMiddleware'
      );
    }

    if(!Object.keys(CITIES).includes(String(query.city))) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'City is not found',
        'ValidateQueryCityMiddleware'
      );
    }

    return next();
  }
}
