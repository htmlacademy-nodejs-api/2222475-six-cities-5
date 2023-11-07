import { inject, injectable } from 'inversify';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { ChangeFavoriteDto } from './dto/change-favorite.dto.js';
import { OfferEntity } from '../offer/index.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async add(dto: ChangeFavoriteDto): Promise<DocumentType<OfferEntity> | null> {
    await this.favoriteModel.create(dto);

    return this.offerModel
      .findById(dto.offerId)
      .populate(['userId'])
      .exec();
  }

  public async remove(dto: ChangeFavoriteDto): Promise<DocumentType<OfferEntity> | null> {
    await this.favoriteModel
      .deleteOne({offerId: dto.offerId, userId: dto.userId})
      .exec();

    return this.offerModel
      .findById(dto.offerId)
      .populate(['userId'])
      .exec();
  }

  public async exists(offerId: string, userId: string): Promise<boolean> {
    return (await this.favoriteModel
      .exists({offerId: offerId, userId: userId})) !== null;
  }
}
