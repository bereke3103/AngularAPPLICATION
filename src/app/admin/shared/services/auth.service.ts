import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IFireBaseAuth, IUser } from 'src/app/shared/IUser';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}
  public error$: Subject<string> = new Subject<string>();
  get token(): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') as string);
    console.log('expDate', expDate);
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token') as string;
  }
  login(user: IUser): Observable<any> {
    user.returnSecureToken = true;
    return this.http
      .post<IFireBaseAuth>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken), catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const { message } = error.error.error;
    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Такого email-a нет');
        break;

      default:
        break;
    }

    return throwError(() => error);
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken(response: IFireBaseAuth | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
      console.log(response);
    } else {
      localStorage.clear();
    }
  }
}
