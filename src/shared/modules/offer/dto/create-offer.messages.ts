import { CITIES, GOODS_LIST } from '../../../../const.js';

export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  createdDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    IsIn: `Field city must be the one of value from the list: ${ Object.keys(CITIES).join(', ')}`,
  },
  previewImage: {
    maxLength: 'Too long for field «image»',
    invalidFormat: 'Field image must be an array',
  },
  images: {
    invalidFormat: 'Field images must be an array',
    ArraySize: 'Field images must contain 6 pictures',
  },
  goods: {
    invalidFormat: 'Field goods must be an array',
    ArrayMinSize: 'Field goods must contain at least 1 good',
    ArrayMaxSize: 'Field goods must contain no more 7 goods',
    IsIn: `Field goods must be one or more options from the list: ${ GOODS_LIST.join(', ')}`,
  },
  isPremium: {
    IsBoolean: 'Field isPremium must be a boolean',
  },
  type: {
    invalid: 'type must be apartment, house, room or hotel',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  bedrooms: {
    invalidFormat: 'Bedrooms must be an integer',
    minValue: 'Minimum bedrooms is 1',
    maxValue: 'Maximum bedrooms is 8',
  },
  maxAdults: {
    invalidFormat: 'Max adults must be an integer',
    minValue: 'Minimum max adults is 1',
    maxValue: 'Maximum max adults is 10',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
