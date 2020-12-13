import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../auth-model/user.model';
import { environment } from '../../../../environments/environment';

export interface AuthResponseData {
  _id: string;
  email: string;
  userType: string;
  token: string;
  expiresIn: string;
}

export class UserData {
  email: string;
  // tslint:disable-next-line: variable-name
  _id: string;
  userType: string;
  // tslint:disable-next-line: variable-name
  _token: string;
  // tslint:disable-next-line: variable-name
  _tokenExpirationDate: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {}

  getUser() {
    return this.user;
  }

  getUserData() {
    const user = JSON.parse(localStorage.getItem('userData'));
    delete user._token;
    delete user._tokenExpirationDate;
    return user;
  }

  createUser(data: any) {
    return this.http.post<AuthResponseData>(environment.backend + 'newUser', data).pipe(
      catchError(this.handleError),
      tap((resData: any) => {
        this.handleAuthentication(
          resData.email,
          resData._id,
          resData.userType,
          resData.token,
          +resData.expiresIn
        );
      })
    );
  }

  login(email: string, password: string) {
    const data = {
      email,
      password,
    };
    return this.http.post<AuthResponseData>(environment.backend + 'login', data).pipe(
      catchError(this.handleError),
      tap((resData: any) => {
        this.handleAuthentication(
          resData.email,
          resData._id,
          resData.userType,
          resData.token,
          +resData.expiresIn
        );
      })
    );
  }

  loadUser(userData: UserData) {
    const loadedUser = new User(
      userData.email,
      userData._id,
      userData.userType,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);

      if (loadedUser.userType === 'user') {
        this.router.navigate(['/dashboard/products'], { relativeTo: this.route });
      } else {
        this.router.navigate(['/'], { relativeTo: this.route });
      }
      return;
    }
  }

  autoLogin(userData: UserData) {
    this.loadUser(userData);
    this.http.post(environment.backend + 'autoLogin', {}).subscribe(
      (response: any) => {},
      (err: any) => {
        this.removeUser();
        this.router.navigate(['/login'], { relativeTo: this.route });
      }
    );
  }

  logout() {
    return this.http.post(environment.backend + 'logout', {}).subscribe(
      (resData: any) => {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      },
      (errorMessage: any) => {}
    );
  }

  removeUser() {
    if (localStorage.getItem('userData')) {
      localStorage.removeItem('userData');
    }
    this.user.next(null);
  }

  logoutAll() {
    return this.http.post(environment.backend + 'logoutAll', {}).subscribe(
      (resData: any) => {
        this.user.next(null);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
          clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
      },
      (errorMessage: any) => {}
    );
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    userType: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, userType, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (errorRes.error) {
      if (typeof errorRes.error === 'object') {
        errorMessage = 'Cant Reach Server.., Please Try Again';
      } else {
        errorMessage = errorRes.error;
      }
    }
    return throwError(errorMessage);
  }
}
