import {
  CITIES,
  GOODS_LIST,
  OfferGeneratorAdults,
  OfferGeneratorBedrooms,
  OfferGeneratorPrice
} from '../../../../const.js';
import { OFFER_VALIDATION_OPTIONS } from '../offer.constant.js';
import { OfferTypeEnum } from '../../../types/index.js';

export const CREATE_OFFER_VALIDATION_MESSAGE = {
  TITLE: {
    MIN_LENGTH: `Minimum title length must be ${OFFER_VALIDATION_OPTIONS.TITLE.MIN_LENGTH}`,
    MAX_LENGTH: `Maximum title length must be ${OFFER_VALIDATION_OPTIONS.TITLE.MAX_LENGTH}`,
  },
  DESCRIPTION: {
    MIN_LENGTH: `Minimum description length must be ${OFFER_VALIDATION_OPTIONS.DESCRIPTION.MIN_LENGTH}`,
    MAX_LENGTH: `Maximum description length must be ${OFFER_VALIDATION_OPTIONS.DESCRIPTION.MAX_LENGTH}`,
  },
  CREATED_DATE: {
    INVALID_FORMAT: 'postDate must be a valid ISO date',
  },
  CITY: {
    IS_IN: `Field city must be the one of value from the list: ${ Object.keys(CITIES).join(', ')}`,
  },
  PREVIEW_IMAGE: {
    MAX_LENGTH: 'Too long for field «image»',
  },
  IMAGES: {
    INVALID_FORMAT: 'Field images must be an array',
    ARRAY_SIZE: `Field images must contain ${OFFER_VALIDATION_OPTIONS.IMAGES.ARRAY_SIZE} pictures`,
  },
  GOODS: {
    INVALID_FORMAT: 'Field goods must be an array',
    ARRAY_MIN_SIZE: `Field goods must contain at least ${OFFER_VALIDATION_OPTIONS.GOODS.MIN_SIZE} good`,
    ARRAY_MAX_SIZE: `Field goods must contain no more ${OFFER_VALIDATION_OPTIONS.GOODS.MAX_SIZE} goods`,
    IS_IN: `Field goods must be one or more options from the list: ${ GOODS_LIST.join(', ')}`,
  },
  IS_PREMIUM: {
    IS_BOOLEAN: 'Field isPremium must be a boolean',
  },
  TYPE: {
    INVALID: `Type must be one of this: ${Object.values(OfferTypeEnum).join(', ')}`,
  },
  PRICE: {
    INVALID_FORMAT: 'Price must be an integer',
    MIN_VALUE: `Minimum price is ${OfferGeneratorPrice.MinPrice}`,
    MAX_VALUE: `Maximum price is ${OfferGeneratorPrice.MaxPrice}`,
  },
  BEDROOMS: {
    INVALID_FORMAT: 'Bedrooms must be an integer',
    MIN_VALUE: `Minimum bedrooms is ${OfferGeneratorBedrooms.MinBedrooms}`,
    MAX_VALUE: `Maximum bedrooms is ${OfferGeneratorBedrooms.MaxBedrooms}`,
  },
  MAX_ADULTS: {
    INVALID_FORMAT: 'Max adults must be an integer',
    MIN_VALUE: `Minimum max adults is ${OfferGeneratorAdults.MinAdults}`,
    MAX_VALUE: `Maximum max adults is ${OfferGeneratorAdults.MaxAdults}`,
  },
  USER_ID: {
    INVALID_ID: 'userId field must be a valid id',
  },
};
