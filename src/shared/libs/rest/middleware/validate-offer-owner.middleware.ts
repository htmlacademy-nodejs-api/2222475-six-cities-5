import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { DocumentIsOfferOwner } from '../../../types/document-is-offer-owner.interface.js';

export class ValidateOfferOwnerMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentIsOfferOwner,
    private readonly param: string,
  ) {}

  public async execute({ params, tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    const offerId = params[this.param];
    const userId = tokenPayload.id;

    if (! await this.service.isOfferOwner(offerId, userId)) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `You cannot edit the object ${offerId}`,
        'ValidateOfferOwnerMiddleware'
      );
    }

    next();
  }
}
