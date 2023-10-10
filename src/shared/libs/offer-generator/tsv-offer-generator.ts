import dayjs from 'dayjs';
import { OfferGenerator } from './offer-generator.interface.js';
import { CityType, MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems, getRandomPosition } from '../../helpers/index.js';
import { CITIES } from '../../../const.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_BEDROOMS = 1;
const MAX_BEDROOMS = 8;

const MIN_ADULTS = 1;
const MAX_ADULTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;
const RATING_NUM_DIGIT = 2;

const BOOL_TRUE = 1;
const BOOL_FALSE = 0;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

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
    const isFavorite = generateRandomValue(BOOL_FALSE, BOOL_TRUE).toString();
    const hostIsPro = generateRandomValue(BOOL_FALSE, BOOL_TRUE).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_NUM_DIGIT).toString();
    const bedrooms = generateRandomValue(MIN_BEDROOMS, MAX_BEDROOMS).toString();
    const maxAdults = generateRandomValue(MIN_ADULTS, MAX_ADULTS).toString();
    const goods = getRandomItems<string>(this.mockData.goods).join(';');
    const type = getRandomItem<string>(this.mockData.types);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
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
      isFavorite,
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
