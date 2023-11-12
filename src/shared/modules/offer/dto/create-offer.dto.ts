import { OfferTypeEnum } from '../../../types/index.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';
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
import { CITIES, GOODS_LIST } from '../../../../const.js';
import { Type } from 'class-transformer';
import { LocationDto } from './location.dto.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferValidationMessage.createdDate.invalidFormat })
  public createdDate: Date;

  @IsOptional()
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsIn(Object.keys(CITIES), { each: true, message: CreateOfferValidationMessage.city.IsIn })
  public city: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.ArraySize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.images.ArraySize })
  @MaxLength(256, { each: true, message: CreateOfferValidationMessage.previewImage.maxLength })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.IsBoolean })
  public isPremium: boolean;

  @IsOptional()
  public rating?: number;

  @IsEnum(OfferTypeEnum, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferTypeEnum;

  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.goods.ArrayMinSize })
  @ArrayMaxSize(7, { message: CreateOfferValidationMessage.goods.ArrayMaxSize })
  @IsIn(GOODS_LIST, { each: true, message: CreateOfferValidationMessage.goods.IsIn })
  public goods: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => LocationDto)
  public location: LocationDto;

  public userId: string;
}
