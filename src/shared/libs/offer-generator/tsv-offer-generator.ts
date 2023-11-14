import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { CityType, MockServerData, OfferTypeEnum } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getRandomPosition } from '../../helpers/index.js';
import {
  BOOL_FALSE,
  BOOL_TRUE,
  CITIES,
  FIRST_WEEK_DAY,
  LAST_WEEK_DAY,
  OfferGeneratorPrice,
  OfferGeneratorBedrooms,
  OfferGeneratorAdults,
  OfferGeneratorRating,
  RATING_NUM_DIGIT
} from '../../../const.js';
import { DEFAULT_OFFER_COMMENT_COUNT } from '../../modules/offer/offer.constant.js';


export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<CityType>(Object.values(CITIES));
    const locationString = getRandomPosition(city);
    const previewImage = getRandomItem<string>(this.mockData.images);
    const images = [];
    for (let i = 0; i < 6; i++) {
      images.push(getRandomItem<string>(this.mockData.images));
    }
    const isPremium = generateRandomValue(BOOL_FALSE, BOOL_TRUE).toString();
    const hostIsPro = generateRandomValue(BOOL_FALSE, BOOL_TRUE).toString();
    const rating = generateRandomValue(OfferGeneratorRating.MinRating, OfferGeneratorRating.MaxRating, RATING_NUM_DIGIT).toString();
    const bedrooms = generateRandomValue(OfferGeneratorBedrooms.MinBedrooms, OfferGeneratorBedrooms.MaxBedrooms).toString();
    const maxAdults = generateRandomValue(OfferGeneratorAdults.MinAdults, OfferGeneratorAdults.MaxAdults).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const type = getRandomItem(Object.values(OfferTypeEnum));
    const price = generateRandomValue(OfferGeneratorPrice.MinPrice, OfferGeneratorPrice.MaxPrice).toString();
    const hostName = getRandomItem<string>(this.mockData.hostNames);
    const hostEmail = getRandomItem<string>(this.mockData.emails);
    const hostAvatarUrl = getRandomItem<string>(this.mockData.avatarUrls);

    const createdDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title,
      description,
      createdDate,
      city.title,
      previewImage,
      images.join(';'),
      isPremium,
      DEFAULT_OFFER_COMMENT_COUNT,
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
    ].join('\t');
  }
}
