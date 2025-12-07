import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { RegisterBookComponent } from './components/register-book/register-book.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'register-book', component: RegisterBookComponent },
      { path: '', redirectTo: 'register-user', pathMatch: 'full' },
    ],
  },
];
