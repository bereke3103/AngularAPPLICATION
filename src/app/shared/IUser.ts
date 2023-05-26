export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
export class IFireBaseAuth {
  idToken: string;
  expiresIn: string;
}
