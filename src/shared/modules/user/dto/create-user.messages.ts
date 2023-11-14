import { USER_VALIDATION_OPTIONS } from '../user.constant.js';

export const CREATE_USER_MESSAGES = {
  EMAIL: {
    INVALID_FORMAT: 'Email must be a valid address'
  },
  NAME: {
    INVALID_FORMAT: 'Firstname is required',
    LENGTH_FIELD: `Min length is ${USER_VALIDATION_OPTIONS.NAME.MIN_LENGTH}, max is ${USER_VALIDATION_OPTIONS.NAME.MAX_LENGTH}`,
  },
  PASSWORD: {
    INVALID_FORMAT: 'Password is required',
    LENGTH_FIELD: `Min length for password is ${USER_VALIDATION_OPTIONS.PASSWORD.MIN_LENGTH}, max is ${USER_VALIDATION_OPTIONS.PASSWORD.MAX_LENGTH}`
  },
  IS_PRO: {
    IS_BOOLEAN: 'Field isPro must be a boolean',
  },
} as const;
