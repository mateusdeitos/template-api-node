import User from '../entities/typeorm/User';

export interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

export interface IResponseAuthenticationDTO {
  user: User;
  token: string;
}
