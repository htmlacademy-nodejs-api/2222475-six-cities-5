import { Location, OfferTypeEnum } from '../../../types/index.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsInt, IsObject, IsOptional, Max,
  MaxLength, Min,
  MinLength, ValidateNested
} from 'class-validator';
import { CREATE_OFFER_VALIDATION_MESSAGE } from './create-offer.messages.js';
import {
  CITIES,
  GOODS_LIST,
  OfferGeneratorAdults,
  OfferGeneratorBedrooms,
  OfferGeneratorPrice
} from '../../../../const.js';
import { OFFER_VALIDATION_OPTIONS } from '../offer.constant.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(OFFER_VALIDATION_OPTIONS.TITLE.MIN_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MIN_LENGTH })
  @MaxLength(OFFER_VALIDATION_OPTIONS.TITLE.MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.TITLE.MAX_LENGTH })
  public title?: string;

  @IsOptional()
  @MinLength(OFFER_VALIDATION_OPTIONS.DESCRIPTION.MIN_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MIN_LENGTH })
  @MaxLength(OFFER_VALIDATION_OPTIONS.DESCRIPTION.MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.DESCRIPTION.MAX_LENGTH })
  public description?: string;

  @IsOptional()
  @IsIn(Object.keys(CITIES), { each: true, message: CREATE_OFFER_VALIDATION_MESSAGE.CITY.IS_IN })
  public city?: string;

  @IsOptional()
  @MaxLength(OFFER_VALIDATION_OPTIONS.IMAGES.MAX_LENGTH, { message: CREATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.MAX_LENGTH })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.IMAGES.INVALID_FORMAT })
  @ArrayMinSize(OFFER_VALIDATION_OPTIONS.IMAGES.ARRAY_SIZE, { message: CREATE_OFFER_VALIDATION_MESSAGE.IMAGES.ARRAY_SIZE })
  @ArrayMaxSize(OFFER_VALIDATION_OPTIONS.IMAGES.ARRAY_SIZE, { message: CREATE_OFFER_VALIDATION_MESSAGE.IMAGES.ARRAY_SIZE })
  @MaxLength(OFFER_VALIDATION_OPTIONS.IMAGES.MAX_LENGTH, { each: true, message: CREATE_OFFER_VALIDATION_MESSAGE.PREVIEW_IMAGE.MAX_LENGTH })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CREATE_OFFER_VALIDATION_MESSAGE.IS_PREMIUM.IS_BOOLEAN })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferTypeEnum, { message: CREATE_OFFER_VALIDATION_MESSAGE.TYPE.INVALID })
  public type?: string;

  @IsOptional()
  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.INVALID_FORMAT })
  @Min(OfferGeneratorBedrooms.MinBedrooms, { message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MIN_VALUE })
  @Max(OfferGeneratorBedrooms.MaxBedrooms, { message: CREATE_OFFER_VALIDATION_MESSAGE.BEDROOMS.MAX_VALUE })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.INVALID_FORMAT })
  @Min(OfferGeneratorAdults.MinAdults, { message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MIN_VALUE })
  @Max(OfferGeneratorAdults.MaxAdults, { message: CREATE_OFFER_VALIDATION_MESSAGE.MAX_ADULTS.MAX_VALUE })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.INVALID_FORMAT })
  @Min(OfferGeneratorPrice.MinPrice, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MIN_VALUE })
  @Max(OfferGeneratorPrice.MaxPrice, { message: CREATE_OFFER_VALIDATION_MESSAGE.PRICE.MAX_VALUE })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.INVALID_FORMAT })
  @ArrayMinSize(OFFER_VALIDATION_OPTIONS.GOODS.MIN_SIZE, { message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.ARRAY_MIN_SIZE })
  @ArrayMaxSize(OFFER_VALIDATION_OPTIONS.GOODS.MAX_SIZE, { message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.ARRAY_MAX_SIZE })
  @IsIn(GOODS_LIST, { each: true, message: CREATE_OFFER_VALIDATION_MESSAGE.GOODS.IS_IN })
  public goods?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  public location?: Location;
}
