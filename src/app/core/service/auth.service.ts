import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PATHS } from '../paths';
import { Login } from '../models/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase = environment.apiUrl;

  constructor(private _http: HttpClient) {}

  login(login: Login) {
    const url = `${this.urlBase + PATHS.login}`;
    return this._http.post(url, login);
  }
}
