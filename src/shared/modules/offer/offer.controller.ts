import {
  BaseController,
  DocumentExistsMiddleware, HttpError,
  HttpMethod,
  PrivateRouteMiddleware, UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { ParamOfferId } from './type/param-offerid.type.js';
import { fillDTO } from '../../helpers/index.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { CreateOfferRequest } from './type/create-offer-request.type.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { CommentRdo, CommentService } from '../comment/index.js';
import { Config, RestSchema } from '../../libs/config/index.js';
import { UploadPreviewImageRdo } from './rdo/upload-preview-image.rdo.js';
import { ALLOWED_IMAGE_MIME_TYPES } from '../../../const.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { StatusCodes } from 'http-status-codes';
import { UploadImagesRdo } from './rdo/upload-images.rdo.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_OFFER_RATING, MAX_OFFER_IMAGES } from './offer.constant.js';
import { OfferListRdo } from './rdo/offer-list.rdo.js';
import { ValidateQueryCityMiddleware } from '../../libs/rest/middleware/validate-query-city.middleware.js';
import { ValidateOfferOwnerMiddleware } from '../../libs/rest/middleware/validate-offer-owner.middleware.js';

@injectable()
export default class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController');
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/fetch-favorite',
      method: HttpMethod.Get,
      handler: this.findFavorites,
      middlewares: [
        new PrivateRouteMiddleware()
      ]
    });
    this.addRoute({
      path: '/fetch-premium',
      method: HttpMethod.Get,
      handler: this.findPremium,
      middlewares: [
        new ValidateQueryCityMiddleware()
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateOfferOwnerMiddleware(this.offerService, 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new ValidateOfferOwnerMiddleware(this.offerService, 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/previewImage',
      method: HttpMethod.Post,
      handler: this.uploadPreviewImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateOfferOwnerMiddleware(this.offerService, 'offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'previewImage', ALLOWED_IMAGE_MIME_TYPES),
      ]
    });
    this.addRoute({
      path: '/:offerId/images',
      method: HttpMethod.Post,
      handler: this.uploadImages,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateOfferOwnerMiddleware(this.offerService, 'offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'images', ALLOWED_IMAGE_MIME_TYPES, MAX_OFFER_IMAGES),
      ]
    });
  }

  public async show({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.findById(offerId, tokenPayload ? tokenPayload.id : undefined);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async index({tokenPayload, query}: Request, res: Response) {
    const limit = query.limit ? Number(query.limit) : DEFAULT_OFFER_COUNT;
    const userId = tokenPayload ? tokenPayload.id : undefined;
    const offers = await this.offerService.find(userId, limit);
    this.ok(res, fillDTO(OfferListRdo, offers));
  }

  public async findFavorites({tokenPayload}: Request, res: Response) {
    const userId = tokenPayload ? tokenPayload.id : undefined;
    const offers = await this.offerService.findFavorites(userId);
    this.ok(res, fillDTO(OfferListRdo, offers));
  }

  public async findPremium({tokenPayload, query}: Request, res: Response) {
    const city = String(query.city);
    const userId = tokenPayload ? tokenPayload.id : undefined;
    const offers = await this.offerService.findPremium(city, userId);
    this.ok(res, fillDTO(OfferListRdo, offers));
  }

  public async create({ body, tokenPayload }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id, rating: DEFAULT_OFFER_RATING });
    const offer = await this.offerService.findById(result.id, tokenPayload.id);
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);

    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async update({ body, params, tokenPayload }: Request<ParamOfferId, unknown, UpdateOfferDto>, res: Response): Promise<void> {
    await this.offerService.updateById(params.offerId, body);
    const updatedOffer = await this.offerService.findById(params.offerId, tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async uploadPreviewImage({ params, file } : Request<ParamOfferId>, res: Response) {
    const { offerId } = params;
    const updateDto = { previewImage: file?.filename };
    await this.offerService.updateById(offerId, updateDto);
    this.ok(res, fillDTO(UploadPreviewImageRdo, updateDto));
  }

  public async uploadImages({ params, files }: Request<ParamOfferId>, res: Response): Promise<void> {
    this.logger.warn(`${files}`);
    if (!Array.isArray(files)) {
      throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, 'No files were uploaded');
    }

    const { offerId } = params;
    const updateDto = { images: files.map((file) => file.filename) };
    await this.offerService.updateById(offerId, updateDto);
    this.ok(res, fillDTO(UploadImagesRdo, updateDto));
  }
}

