import { IsMongoId } from 'class-validator';
import { CHANGE_FAVORITE_MESSAGE } from './change-favorite.messages.js';
export class ChangeFavoriteDto {
  @IsMongoId({ message: CHANGE_FAVORITE_MESSAGE.OFFER_ID.INVALID_FORMAT })
  public offerId: string;

  public userId: string;
}
