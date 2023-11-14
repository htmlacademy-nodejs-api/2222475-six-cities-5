import { IsEmail, IsString } from 'class-validator';
import { CREATE_LOGIN_USER_MESSAGE } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: CREATE_LOGIN_USER_MESSAGE.EMAIL.INVALID_FORMAT })
  public email: string;

  @IsString({ message: CREATE_LOGIN_USER_MESSAGE.PASSWORD.INVALID_FORMAT })
  public password: string;
}
