export interface Location {
  latitude: number;
  longitude: number;
}

export interface Host {
  id?: number;
  name: string;
  email: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface Offer {
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
  host: Host;
  location: Location;
}

export type Offers = Offer[];
