import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IBookResponse } from '../models/books-response.interface';
import { PATHS } from '../constants/paths';
import { StorageService } from './storage.service';
import { KEYS } from '../constants/storage-keys';
import { IReserveBookRequest } from '../models/reserve-book.interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private urlBase = environment.apiUrl;

  constructor(private _http: HttpClient, private _storageSrv: StorageService) {}

  getBooks(): Observable<IBookResponse[]> {
    const url = `${this.urlBase + PATHS.getBooks}`;

    return this._http.get<IBookResponse[]>(url).pipe(
      map((resp) =>
        resp.map((item) => {
          item.rutaImagenLibro = this.getImage(item.rutaImagenLibro);
          return item;
        })
      )
    );
  }

  reserveBook(request: IReserveBookRequest) {
    const url = `${this.urlBase + PATHS.reserveBook}`;

    return this._http.post(url, request);
  }

  saveBookCache(book: IBookResponse) {
    this._storageSrv.save(KEYS.book, book);
  }

  getBookCache() {
    return this._storageSrv.get<IBookResponse>(KEYS.book);
  }

  private getImage(path: string): string {
    return `${this.urlBase}/${path}`;
  }
}
