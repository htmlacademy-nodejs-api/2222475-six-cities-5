import { IsMongoId } from 'class-validator';
import { ChangeFavoriteMessage } from './change-favorite.messages.js';
export class ChangeFavoriteDto {
  @IsMongoId({ message: ChangeFavoriteMessage.offerId.invalidFormat })
  public offerId: string;

  public userId: string;
}
