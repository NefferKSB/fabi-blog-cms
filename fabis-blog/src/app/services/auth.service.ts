import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL + '/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatusListener = new Subject<boolean>();
  redirectUrl: string = '';

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'login', data)
      .pipe(
        tap(_ => {
          this.authStatusListener.next(true);
        }),
        catchError(this.handleError('login', []))
      );
  }

  logout(): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'logout', {})
      .pipe(
        tap(_ => {
          this.authStatusListener.next(false);
        }),
        catchError(this.handleError('logout', []))
      );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(BACKEND_URL + 'register', data)
      .pipe(
        tap(_ => this.log('register')),
        catchError(this.handleError('registration', []))
      );
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

}
