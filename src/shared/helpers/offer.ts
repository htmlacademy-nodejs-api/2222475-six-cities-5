import { OfferType, OfferTypeEnum } from '../types/index.js';

export function createOffer(offerData: string): OfferType {
  const [
    title,
    description,
    createdDate,
    city,
    previewImage,
    images,
    isPremium,
    commentCount,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    locationString,
    hostName,
    hostEmail,
    hostAvatarUrl,
    hostIsPro
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name: hostName,
    email: hostEmail,
    avatarUrl: hostAvatarUrl,
    isPro: !!hostIsPro
  };

  const location = {
    latitude: Number(locationString.split(':')[0]),
    longitude: Number(locationString.split(':')[1]),
  };

  return {
    title,
    description,
    createdDate: new Date(createdDate),
    city: city,
    previewImage,
    images: images.split(';'),
    isPremium: !!isPremium,
    commentCount: Number(commentCount),
    rating: Number(rating),
    type: OfferTypeEnum[type as 'House' | 'Apartment' | 'Room' | 'Hotel'],
    bedrooms: Number(bedrooms),
    maxAdults: Number(maxAdults),
    price: Number.parseInt(price, 10),
    goods: goods.split(';'),
    user: user,
    location: location,
  };
}
