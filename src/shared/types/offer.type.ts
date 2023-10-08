import { User } from './user.type.js';

export interface Location {
  latitude: number;
  longitude: number;
}

export interface OfferType {
  id?: number;
  title: string;
  description: string;
  createdDate: Date;
  city: number;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: string;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  user: User;
  location: Location;
}

export type Offers = OfferType[];
