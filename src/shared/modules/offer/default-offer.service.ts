import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { DEFAULT_OFFER_COUNT, MAX_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { SortType } from '../../types/sort-type.enum.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;

    const lookupOperation = {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'offerId',
        as: 'comments',
      },
    };

    const addFieldsOperation = {
      $addFields: {
        rating: {
          $divide: [
            {
              $reduce: {
                input: '$comments',
                initialValue: 0,
                in: { $add: ['$$value', '$$this.rating'] },
              },
            },
            {
              $cond: {
                if: {$ne: [{$size: '$comments'}, 0]},
                then: {$size: '$comments'},
                else: 1
              },
            },
          ],
        },
        commentsCount: { $size: '$comments' },
      },
    };

    const removeCommentsOperation = { $unset: 'comments'};

    const limitOperation = { $limit: limit };

    const sortOperation = { $sort: { createdAt: SortType.Down } };

    return this.offerModel
      .aggregate([
        lookupOperation,
        addFieldsOperation,
        removeCommentsOperation,
        limitOperation,
        sortOperation
      ])
      .exec();
  }

  public async findPremium(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(MAX_PREMIUM_OFFER_COUNT)
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }
}
