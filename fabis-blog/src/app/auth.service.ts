import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

const BACKEND_URL = environment.apiURL + '/auth/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
