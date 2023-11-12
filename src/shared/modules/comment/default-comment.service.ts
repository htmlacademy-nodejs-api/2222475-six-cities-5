import { inject, injectable } from 'inversify';
import { CommentService } from './comment-service.interface.js';
import { Component } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { SortType } from '../../types/sort-type.enum.js';
import { MAX_COMMENTS_OFFER_COUNT, RATING_FRICTION_DIGITS } from './comment.constant.js';
import { Types } from 'mongoose';
import { OfferEntity } from '../offer/index.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.calculateRatingByOfferId(dto.offerId);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .sort({ createdAt: SortType.Down })
      .limit(MAX_COMMENTS_OFFER_COUNT)
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    return result.deletedCount;
  }

  private async calculateRatingByOfferId(offerId: string): Promise<void> {
    const result = await this.commentModel
      .aggregate([
        {$match: {offerId: new Types.ObjectId(offerId)}},
        {
          $group: {
            '_id': {},
            'avarage_rating': { $avg: '$rating' },
          }
        }
      ])
      .exec();

    let rating = 0;
    if(result[0]) {
      rating = Number(result[0].avarage_rating.toFixed(RATING_FRICTION_DIGITS));
    }

    await this.offerModel
      .findByIdAndUpdate(offerId, {
        rating: rating,
      }).exec();
  }
}
