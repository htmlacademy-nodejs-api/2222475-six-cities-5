import { inject, injectable } from 'inversify';
import { FavoriteService } from './favorite-service.interface.js';
import { Component } from '../../types/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { ChangeFavoriteDto } from './dto/change-favorite.dto.js';
import { OfferEntity, OfferService } from '../offer/index.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {}

  public async add(dto: ChangeFavoriteDto): Promise<DocumentType<OfferEntity> | null> {
    await this.favoriteModel.create(dto);

    return await this.offerService.findById(dto.offerId, dto.userId);
  }

  public async remove(dto: ChangeFavoriteDto): Promise<DocumentType<OfferEntity> | null> {
    await this.favoriteModel
      .deleteOne({offerId: dto.offerId, userId: dto.userId})
      .exec();

    return await this.offerService.findById(dto.offerId, dto.userId);
  }

  public async exists(offerId: string, userId: string): Promise<boolean> {
    return (await this.favoriteModel
      .exists({offerId: offerId, userId: userId})) !== null;
  }
}
