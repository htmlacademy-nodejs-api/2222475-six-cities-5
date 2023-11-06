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
import { CreateOfferValidationMessage } from './create-offer.messages.js';
import { CITIES, GOODS_LIST } from '../../../../const.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsIn(Object.keys(CITIES), { each: true, message: CreateOfferValidationMessage.city.IsIn })
  public city?: string;

  @IsOptional()
  @MaxLength(256, { message: CreateOfferValidationMessage.previewImage.maxLength })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.ArraySize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.images.ArraySize })
  @MaxLength(256, { each: true, message: CreateOfferValidationMessage.previewImage.maxLength })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.IsBoolean })
  public isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferTypeEnum, { message: CreateOfferValidationMessage.type.invalid })
  public type?: string;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.bedrooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.bedrooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.bedrooms.maxValue })
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.maxAdults.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.maxAdults.minValue })
  @Max(10, { message: CreateOfferValidationMessage.maxAdults.maxValue })
  public maxAdults?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.goods.invalidFormat })
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.goods.ArrayMinSize })
  @ArrayMaxSize(7, { message: CreateOfferValidationMessage.goods.ArrayMaxSize })
  @IsIn(GOODS_LIST, { each: true, message: CreateOfferValidationMessage.goods.IsIn })
  public goods?: string[];

  @IsOptional()
  @IsObject()
  @ValidateNested()
  public location?: Location;
}
