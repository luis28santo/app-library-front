import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PATHS } from '../constants/paths';
import { IUserResponse } from '../models/user-response';
import { IBookResponse } from '../models/books-response.interface';
import { IUserByFullNameResponse } from '../models/user-by-fullname-response';
import { IRegisterLoanRequest } from '../models/register-loan-request';
import { IRegisterLoanResponse } from '../models/register-loan-response';
import { ILoanByUser } from '../models/loan-by-user';
import { IBookReturnRequest } from '../models/book-return-request';

@Injectable({
  providedIn: 'root',
})
export class LibrarianService {
  private urlBase = environment.apiUrl;

  constructor(private _http: HttpClient, private _storageSrv: StorageService) {}

  getUsers(): Observable<IUserResponse[]> {
    const url = `${this.urlBase + PATHS.getUsers}`;

    return this._http.get<IUserResponse[]>(url);
  }

  getUsersByFullName(termino: string): Observable<IUserByFullNameResponse[]> {
    const url = `${this.urlBase + PATHS.getUsersByFullName}`;

    return this._http.get<IUserByFullNameResponse[]>(url, { params: { termino } });
  }

  searchBookByTitle(titulo: string): Observable<IBookResponse[]> {
    const url = `${this.urlBase + PATHS.searchBookByTitle}`;

    return this._http.get<IBookResponse[]>(url, { params: { titulo } });
  }

  registerLoan(request: IRegisterLoanRequest): Observable<IRegisterLoanResponse> {
    const url = `${this.urlBase + PATHS.registerLoan}`;

    return this._http.post<IRegisterLoanResponse>(url, request);
  }

  loansByUser(document: string): Observable<ILoanByUser[]> {
    const url = `${this.urlBase + PATHS.loansByUser}/${document}`;
    return this._http.get<ILoanByUser[]>(url);
  }

  bookReturn(request: IBookReturnRequest): Observable<string> {
    const url = `${this.urlBase + PATHS.bookReturn}`;
    return this._http.put<string>(url, request);
  }
}
