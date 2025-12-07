import { Component } from '@angular/core';
import { CardListComponent } from '../../../../shared/components/card-list/card-list.component';

@Component({
  selector: 'app-books-available.component',
  imports: [CardListComponent],
  templateUrl: './books-available.component.html',
  styleUrl: './books-available.component.scss',
})
export class BooksAvailableComponent {}
