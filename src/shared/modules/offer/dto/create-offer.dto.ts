import { OfferTypeEnum } from '../../../types/index.js';
import { CREATE_OFFER_VALIDATION_MESSAGE } from './create-offer.messages.js';
import {
  IsArray,
  IsDateString,
  MaxLength,
  MinLength,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  IsEnum, IsInt, Min, Max, IsObject, ValidateNested, IsIn, IsOptional
} from 'class-validator';
import {
  CITIES,
  GOODS_LIST,
  OfferGeneratorAdults,
  OfferGeneratorBedrooms,
  OfferGeneratorPrice
} from '../../../../const.js';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto.js';
import { OFFER_VALIDATION_OPTIONS } from '../offer.constant.js';

export class CreateOfferDto {
  @MinLength(OFFER_VALIDATION_OPTIONS.TITLE.MIN_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(OFFER_VALIDATION_OPTIONS.TITLE.MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title: string;

  @MinLength(OFFER_VALIDATION_OPTIONS.DESCRIPTION.MIN_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(OFFER_VALIDATION_OPTIONS.DESCRIPTION.MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description: string;

  @IsDateString({}, { message: CREATE_OFFER_VALIDATION_MESSAGE.CREATED_DATE.INVALID_FORMAT })
  public createdDate: Date;

  @IsOptional()
  @MaxLength(OFFER_VALIDATION_OPTIONS.IMAGES.MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.MAX_LENGTH })
  public previewImage?: string;

  @IsIn(Object.keys(CITIES), { each: true, message: CREATE_OFFER_VALIDATION_MESSAGE.CITY.IS_IN })
  public city: string;

  @IsOptional()
  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT })
  @ArrayMinSize(OFFER_VALIDATION_OPTIONS.IMAGES.ARRAY_SIZE, { message: CREATE_OFFER_VALIDATION_MESSAGE.IMAGES.ARRAY_SIZE })
  @ArrayMaxSize(OFFER_VALIDATION_OPTIONS.IMAGES.ARRAY_SIZE, { message: CREATE_OFFER_VALIDATION_MESSAGE.IMAGES.ARRAY_SIZE })
  @MaxLength(OFFER_VALIDATION_OPTIONS.IMAGES.MAX_LENGTH, { each: true, message: CREATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.MAX_LENGTH })
  public images: string[];

  @IsBoolean({ message: CREATE_OFFER_VALIDATION_MESSAGE.IS_PREMIUM.IS_BOOLEAN })
  public isPremium: boolean;

  @IsOptional()
  public rating?: number;

  @IsEnum(OfferTypeEnum, { message: CREATE_OFFER_VALIDATION_MESSAGE.TYPE.INVALID })
  public type: OfferTypeEnum;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.INVALID_FORMAT })
  @Min(OfferGeneratorBedrooms.MinBedrooms, { message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MIN_VALUE })
  @Max(OfferGeneratorBedrooms.MaxBedrooms, { message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MAX_VALUE })
  public bedrooms: number;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.INVALID_FORMAT })
  @Min(OfferGeneratorAdults.MinAdults, { message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MIN_VALUE })
  @Max(OfferGeneratorAdults.MaxAdults, { message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MAX_VALUE })
  public maxAdults: number;

  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(OfferGeneratorPrice.MinPrice, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(OfferGeneratorPrice.MaxPrice, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price: number;

  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  @ArrayMinSize(OFFER_VALIDATION_OPTIONS.GOODS.MIN_SIZE, { message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.ARRAY_MIN_SIZE })
  @ArrayMaxSize(OFFER_VALIDATION_OPTIONS.GOODS.MAX_SIZE, { message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.ARRAY_MAX_SIZE })
  @IsIn(GOODS_LIST, { each: true, message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.IS_IN })
  public goods: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;

  public userId: string;
}
