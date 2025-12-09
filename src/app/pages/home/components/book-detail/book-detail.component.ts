import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../core/service/book.service';
import { Router } from '@angular/router';
import { IBookResponse } from '../../../../core/models/books-response.interface';
import { IReserveBookRequest } from '../../../../core/models/reserve-book.interface';
import { StorageService } from '../../../../core/service/storage.service';
import { KEYS } from '../../../../core/constants/storage-keys';
import { IUser } from '../../../../core/models/user.interface';
import { ToastService } from '../../../../core/service/toast.service';

@Component({
  selector: 'book-detail',
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  book!: IBookResponse | null;

  constructor(
    private _bookSrv: BookService,
    private _router: Router,
    private _storageSrv: StorageService,
    private _toasSrv: ToastService
  ) {}

  ngOnInit(): void {
    this.book = this._bookSrv.getBookCache();

    console.log(this.book);
  }

  reserve() {
    const user = this._storageSrv.get<IUser>(KEYS.userInfo);

    const request: IReserveBookRequest = {
      documentoIdentidad: user!.documentoIdentidad,
      isbnLibro: this.book!.isbnLibro,
    };

    this._bookSrv.reserveBook(request).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this._toasSrv.success(`${resp.estado!} N°: ${resp.idReserva}`);
      },
      error: ({ error, message }) => {
        const detail = error?.detalle ? error?.mensaje + ' ' + error?.detalle : error?.mensaje;
        this._toasSrv.error(detail || message);
      },
    });
  }

  back() {
    this._router.navigate(['/home/books-available']);
  }
}
