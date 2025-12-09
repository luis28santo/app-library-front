import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterBookComponent } from './components/register-book/register-book.component';
import { BooksAvailableComponent } from './components/books-available/books-available.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { RegisterAuthorComponent } from './components/register-author/register-author.component';
import { RegisterLoanComponent } from './components/register-loan/register-loan.component';
import { RegisterReturnComponent } from './components/register-return/register-return.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'register-book', component: RegisterBookComponent },
      { path: 'books-available', component: BooksAvailableComponent },
      { path: 'book-detail/:id', component: BookDetailComponent },
      { path: 'register-author', component: RegisterAuthorComponent },
      { path: 'register-loan', component: RegisterLoanComponent },
      { path: 'register-return', component: RegisterReturnComponent },

      { path: '', redirectTo: 'register-user', pathMatch: 'full' },
    ],
  },
];