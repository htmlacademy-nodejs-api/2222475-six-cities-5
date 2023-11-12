import { Expose, Type } from 'class-transformer';
import { CityType } from '../../../types/index.js';

export class OfferListRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public createdDate: string;

  @Expose()
  public city: CityType;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  @Type(() => Boolean)
  public isFavorite: boolean;

  @Expose()
  public type: string;

  @Expose()
  public price: number;

  @Expose()
  public commentCount: number;

  @Expose()
  public rating: number;
}
