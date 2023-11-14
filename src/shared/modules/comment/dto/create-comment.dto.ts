import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CREATE_COMMENT_MESSAGES } from './create-comment.messages.js';
import { CommentValidate } from '../comment.constant.js';
import { OfferGeneratorRating } from '../../../../const.js';

export class CreateCommentDto {
  @IsString({ message: CREATE_COMMENT_MESSAGES.TEXT.INVALID_FORMAT })
  @Length(CommentValidate.MinTextLength, CommentValidate.MaxTextLength, { message: CREATE_COMMENT_MESSAGES.TEXT.LENGTH_FIELD})
  public text: string;

  @IsMongoId({ message: CREATE_COMMENT_MESSAGES.OFFER_ID.INVALID_FORMAT })
  public offerId: string;

  @IsInt({ message: CREATE_COMMENT_MESSAGES.RATING.INVALID_FORMAT })
  @Min(OfferGeneratorRating.MinRating, { message: CREATE_COMMENT_MESSAGES.RATING.MIN_VALUE })
  @Max(OfferGeneratorRating.MaxRating, { message: CREATE_COMMENT_MESSAGES.RATING.MAX_VALUE })
  public rating: string;

  public userId: string;
}
