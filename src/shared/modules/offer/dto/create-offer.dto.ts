import { Location } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public createdDate: Date;
  public city: string;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: string;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: string[];
  public location: Location;
  public userId: string;
}
