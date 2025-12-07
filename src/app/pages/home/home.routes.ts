import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterBookComponent } from './components/register-book/register-book.component';
import { BooksAvailableComponent } from './components/books-available/books-available.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'register-book', component: RegisterBookComponent },
      { path: 'books-available', component: BooksAvailableComponent },
      { path: 'book-detail/:id', component: BookDetailComponent },

      { path: '', redirectTo: 'register-user', pathMatch: 'full' },
    ],
  },
];
