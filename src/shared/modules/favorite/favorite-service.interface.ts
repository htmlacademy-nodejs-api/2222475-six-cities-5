import { ChangeFavoriteDto } from './dto/change-favorite.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';

export interface FavoriteService {
  add(dto: ChangeFavoriteDto): Promise<DocumentType<OfferEntity> | null>;
  remove(dto: ChangeFavoriteDto): Promise<DocumentType<OfferEntity> | null>;
  exists(offerId: string, userId: string): Promise<boolean>;
}
