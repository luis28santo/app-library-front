import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBookResponse } from '../../../core/models/books-response.interface';

@Component({
  selector: 'card-list',
  imports: [],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent implements OnInit {
  @Input() books: IBookResponse[] = [];

  @Output() bookSelected = new EventEmitter<IBookResponse>();

  ngOnInit(): void {
    console.log(this.books);
  }
}
