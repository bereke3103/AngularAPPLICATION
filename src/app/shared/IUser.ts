export interface IUser {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}
export class IFireBaseAuth {
  idToken: string;
  expiresIn: string;
}

export class IPost {
  id?: string;
  title: string;
  text: string;
  author: string;
  date: Date;
}

export class FbCreateResponse {
  name: string;
}
