import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/shared/IUser';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IFireBaseAuth } from 'src/environments/IEnvironment';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): string {
    return '';
  }
  login(user: IUser): Observable<any> {
    return this.http
      .post<IFireBaseAuth>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken));
  }

  logout() {}

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: IFireBaseAuth) {
    console.log(response.idToken);
  }
}
