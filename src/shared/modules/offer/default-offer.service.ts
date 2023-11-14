import { inject, injectable } from 'inversify';
import { Types } from 'mongoose';
import { OfferService } from './offer-service.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import {
  ADD_COMMENT_COUNT,
  FAVORITE_USER_EXIST,
  FIRST_ARRAY_INDEX,
  MAX_PREMIUM_OFFER_COUNT
} from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string, userId: string): Promise<DocumentType<OfferEntity> | null> {
    const items = await this.offerModel
      .aggregate([
        {$match: {'_id': new Types.ObjectId(`${offerId}`)}},
        {
          $lookup: {
            from: 'users',
            let: {userId: '$userId'},
            pipeline: [
              {$match: {$expr: {$eq: ['$$userId', '$_id']}}},
            ],
            as: 'user'
          },
        },
        {
          $lookup: {
            from: 'favorites',
            let: {
              id: '$_id',
              currentUserId: new Types.ObjectId(userId)
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {$eq: ['$$id', '$offerId']},
                      {$eq: ['$$currentUserId', '$userId']},
                    ]
                  }
                }
              },
            ],
            as: 'favorite'
          },
        },
        {
          $addFields:
            {
              id: { $toString: '$_id'},
              user: {$arrayElemAt: ['$user', FIRST_ARRAY_INDEX]},
              isFavorite: {$size: '$favorite'}
            }
        },
      ])
      .exec();

    return (items && items.length) ? items[0] : null;
  }

  public async exists(documentId: string): Promise<boolean> {
    return !!(await this.offerModel
      .exists({_id: documentId}));
  }

  public async isOfferOwner(offerId: string, userId: string): Promise<boolean> {
    return !!(await this.offerModel
      .exists({_id: offerId, userId}));
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto)
      .exec();
  }

  public async find(userId: string, limit: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'favorites',
            let: {
              id: '$_id',
              currentUserId: new Types.ObjectId(userId)
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {$eq: ['$$id', '$offerId']},
                      {$eq: ['$$currentUserId', '$userId']},
                    ]
                  }
                }
              },
            ],
            as: 'favorite'
          },
        },
        {
          $addFields:
            {
              id: { $toString: '$_id'},
              isFavorite: {$size: '$favorite'}
            }
        },
        {$sort: {createdDate: SortType.Down}}
      ])
      .limit(limit)
      .exec();
  }

  public async findPremium(city: string, userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {$match: {isPremium: true, city}},
        {
          $lookup: {
            from: 'favorites',
            let: {
              id: '$_id',
              currentUserId: new Types.ObjectId(userId)
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {$eq: ['$$id', '$offerId']},
                      {$eq: ['$$currentUserId', '$userId']},
                    ]
                  }
                }
              },
            ],
            as: 'favorite'
          },
        },
        {
          $addFields:
            {
              id: { $toString: '$_id'},
              isFavorite: {$size: '$favorite'}
            }
        },
        {$sort: {createdDate: SortType.Down}}
      ])
      .limit(MAX_PREMIUM_OFFER_COUNT)
      .exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'favorites',
            let: {
              id: '$_id',
              currentUserId: new Types.ObjectId(userId)
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {$eq: ['$$id', '$offerId']},
                      {$eq: ['$$currentUserId', '$userId']},
                    ]
                  }
                }
              },
            ],
            as: 'favorite'
          },
        },
        {
          $addFields:
            {
              id: { $toString: '$_id'},
              isFavorite: {$size: '$favorite'}
            }
        },
        {$match: {'isFavorite': FAVORITE_USER_EXIST}},
      ])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: ADD_COMMENT_COUNT,
        }
      }).exec();
  }
}
