import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IRolResponse } from '../models/rol-response';
import { PATHS } from '../constants/paths';
import { catchError, map, Observable, throwError } from 'rxjs';
import { StorageService } from './storage.service';
import { IUserRegisterRequest } from '../models/user-register-request';
import { IAutorResponse } from '../models/autor-response';
import { IAutorRegisterRequest } from '../models/autor-register-request';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private urlBase = environment.apiUrl;

  constructor(private _http: HttpClient, private _storageSrv: StorageService) {}

  getUsers(): Observable<IRolResponse[]> {
    const url = `${this.urlBase + PATHS.roles}`;

    return this._http.get<IRolResponse[]>(url);
  }

  registerUser(request: IUserRegisterRequest): Observable<any> {
    const url = `${this.urlBase + PATHS.registerUser}`;

    return this._http.post(url, request, { responseType: 'text', observe: 'response' }).pipe(
      map((resp) => {
        if (resp.status == 200) {
          return { success: true, message: 'Registro Usuario OK' };
        }

        return { success: false, message: 'Error desconocido' };
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  getAutores(): Observable<IAutorResponse[]> {
    const url = `${this.urlBase + PATHS.getAutores}`;

    return this._http.get<IAutorResponse[]>(url);
  }

  registerBook(formData: FormData) {
    const url = `${this.urlBase + PATHS.registerBook}`;

    return this._http.post(url, formData, { responseType: 'text', observe: 'response' }).pipe(
      map((resp) => {
        if (resp.status == 200) {
          return { success: true, message: 'Registro Libro OK' };
        }

        return { success: false, message: 'Error desconocido' };
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  registerAutor(request: IAutorRegisterRequest) {
    const url = `${this.urlBase + PATHS.registerBook}`;

    return this._http.post(url, request, { responseType: 'text', observe: 'response' }).pipe(
      map((resp) => {
        if (resp.status == 200) {
          return { success: true, message: 'Registro Autor OK' };
        }

        return { success: false, message: 'Error desconocido' };
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
