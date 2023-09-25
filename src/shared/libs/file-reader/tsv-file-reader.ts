import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { Offer } from '../../types/offer.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([id, title, description, createdDate, city, previewImage, images, isPremium, isFavorite,
        rating, type, bedrooms, maxAdults, price, goods, location, hostId, hostName, hostEmail,
        hostAvatarUrl, hostIsPro]) => ({
        id: Number(id),
        title,
        description,
        createdDate: new Date(createdDate),
        city: Number(city),
        previewImage,
        images: images.split(';'),
        isPremium: !!isPremium,
        isFavorite: !!isFavorite,
        rating: Number(rating),
        type,
        bedrooms: Number(bedrooms),
        maxAdults: Number(maxAdults),
        price: Number.parseInt(price, 10),
        goods: goods.split(';'),
        host: {
          id: Number(hostId),
          name: hostName,
          email: hostEmail,
          avatarUrl: hostAvatarUrl,
          isPro: !!hostIsPro
        },
        location: {
          latitude: Number(location.split(';')[0]),
          longitude: Number(location.split(';')[1]),
        },
      }));
  }
}
