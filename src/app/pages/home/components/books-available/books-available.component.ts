import { Component, OnInit } from '@angular/core';
import { CardListComponent } from '../../../../shared/components/card-list/card-list.component';
import { BookService } from '../../../../core/service/book.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBookResponse } from '../../../../core/models/books-response.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books-available.component',
  imports: [CommonModule, CardListComponent],
  templateUrl: './books-available.component.html',
  styleUrl: './books-available.component.scss',
})
export class BooksAvailableComponent implements OnInit {
  books$!: Observable<IBookResponse[]>;
  constructor(private _bookSrv: BookService, private _router: Router) {}

  ngOnInit(): void {
    this.books$ = this._bookSrv.getBooks();
  }

  onBookSelected(book: IBookResponse) {
    this._bookSrv.saveBookCache(book);
    this._router.navigate(['/home/book-detail/', book.idLibro]);
  }
}
