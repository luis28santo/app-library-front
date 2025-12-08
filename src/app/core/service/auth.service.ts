import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PATHS } from '../constants/paths';
import { ILoginRequest } from '../models/login-request.interface';
import { map, Observable } from 'rxjs';
import { ILoginResponse, IRol } from '../models/login-response.interface';
import { StorageService } from './storage.service';
import { IUser } from '../models/user.interface';
import { KEYS } from '../constants/storage-keys';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBase = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _storageSrv: StorageService,
    private _router: Router
  ) {}

  login(login: ILoginRequest): Observable<void> {
    const url = `${this.urlBase + PATHS.login}`;

    return this._http.post<ILoginResponse>(url, login).pipe(
      map((response) => {
        if (!response.encabezado.resultado) {
          throw new Error(response.encabezado.mensaje);
        }

        this.saveTokenCache(response.token);
        this.saveRolCache(response.rol);
        this.saveUserInfoCache(response);
        this.navigateByRol(response.rol);
      })
    );
  }

  logout() {
    this._storageSrv.clear();
  }

  private navigateByRol(rol: IRol) {
    if (rol.descripcion === 'LECTOR') {
      this._router.navigate(['/home/books-available']);
      return;
    }

    this._router.navigate(['/home']);
  }

  private saveTokenCache(token: string) {
    this._storageSrv.save(KEYS.token, token);
  }

  private saveRolCache(rol: IRol) {
    this._storageSrv.save(KEYS.rol, rol);
  }

  private saveUserInfoCache({ nombres, apellidos }: ILoginResponse) {
    const user: IUser = {
      nombres,
      apellidos,
    };
    this._storageSrv.save(KEYS.userInfo, user);
  }
}
