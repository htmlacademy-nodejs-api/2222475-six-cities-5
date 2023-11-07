export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  rating: {
    invalidFormat: 'rating field must be a number',
    minValue: 'min rating must be 1',
    maxValue: 'max rating must be 5',
  },
} as const;
