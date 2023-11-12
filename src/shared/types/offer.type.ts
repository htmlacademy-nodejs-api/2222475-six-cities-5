import { User } from './user.type.js';
import { OfferTypeEnum } from './offer-type.enum.js';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface OfferType {
  id?: number;
  title: string;
  description: string;
  createdDate: Date;
  city: string;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  commentCount: number;
  rating: number;
  type: OfferTypeEnum;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  user: User;
  location: Location;
}

export type Offers = OfferType[];
