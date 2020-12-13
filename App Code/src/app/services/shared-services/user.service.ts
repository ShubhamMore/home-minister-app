import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpService: HttpService) {}

  checkUser(email: string) {
    const data = { api: 'checkUser', data: { email } };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }
}
