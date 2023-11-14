import { CommentValidate } from '../comment.constant.js';

export const CREATE_COMMENT_MESSAGES = {
  TEXT: {
    INVALID_FORMAT: 'Text is required',
    LENGTH_FIELD: `Min text length is ${CommentValidate.MinTextLength}, max is ${CommentValidate.MaxTextLength}`
  },
  OFFER_ID: {
    INVALID_FORMAT: 'OfferId field must be a valid id'
  },
  RATING: {
    INVALID_FORMAT: 'Rating field must be a integer',
    MIN_VALUE: 'Min rating must be no less then 1',
    MAX_VALUE: 'Max rating must be no more then 5',
  },
};
