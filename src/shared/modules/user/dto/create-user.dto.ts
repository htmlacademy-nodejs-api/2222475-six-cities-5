import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';
import { CREATE_USER_MESSAGES } from './create-user.messages.js';
import { USER_VALIDATION_OPTIONS } from '../user.constant.js';

export class CreateUserDto {
  @IsEmail({}, { message: CREATE_USER_MESSAGES.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsString({ message: CREATE_USER_MESSAGES.NAME.INVALID_FORMAT })
  @Length(USER_VALIDATION_OPTIONS.NAME.MIN_LENGTH, USER_VALIDATION_OPTIONS.NAME.MAX_LENGTH, { message: CREATE_USER_MESSAGES.NAME.LENGTH_FIELD })
  public name: string;

  @IsString({ message: CREATE_USER_MESSAGES.PASSWORD.INVALID_FORMAT })
  @Length(USER_VALIDATION_OPTIONS.PASSWORD.MIN_LENGTH, USER_VALIDATION_OPTIONS.PASSWORD.MAX_LENGTH, { message: CREATE_USER_MESSAGES.PASSWORD.LENGTH_FIELD })
  public password: string;

  @IsBoolean({ message: CREATE_USER_MESSAGES.IS_PRO.IS_BOOLEAN })
  public isPro: boolean;
}
