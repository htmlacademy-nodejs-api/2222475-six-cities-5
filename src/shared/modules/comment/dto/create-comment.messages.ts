export const CreateCommentMessages = {
  text: {
    invalidFormat: 'Text is required',
    lengthField: 'Min text length is 5, max is 2024'
  },
  offerId: {
    invalidFormat: 'OfferId field must be a valid id'
  },
  rating: {
    invalidFormat: 'Rating field must be a integer',
    minValue: 'Min rating must be no less then 1',
    maxValue: 'Max rating must be no more then 5',
  },
} as const;
