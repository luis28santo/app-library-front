import { Component, OnInit } from '@angular/core';
import { LibrarianService } from '../../../../core/service/librarian.service';
import { IUserByFullNameResponse } from '../../../../core/models/user-by-fullname-response';
import {
  FormBuilder,
  FormControl,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { ILoanByUser } from '../../../../core/models/loan-by-user';

@Component({
  selector: 'app-register-return',
  templateUrl: './register-return.component.html',
  styleUrl: './register-return.component.scss',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, CommonModule],
})
export class RegisterReturnComponent implements OnInit {
  searchUserControl = new FormControl('');
  userList$!: Observable<IUserByFullNameResponse[]>;
  loanList$!: Observable<ILoanByUser[]>;
  private searchSubscription!: Subscription;
  usuarioSeleccionado: IUserByFullNameResponse | null = null;

  constructor(private _librarianSrv: LibrarianService, private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchSubscription = this.searchUserControl.valueChanges
      .pipe(debounceTime(1500))
      .subscribe((value) => {
        console.log(value);

        this.getUsers(value!);
      });
  }

  getUsers(value: string) {
    if (!value) {
      return;
    }

    this.userList$ = this._librarianSrv.getUsersByFullName(value);
  }

  selectUser(user: IUserByFullNameResponse) {
    this.usuarioSeleccionado = user;
    this.searchUserControl.setValue(user.nombre + ' ' + user.apellido, { emitEvent: false });
    this.userList$ = new BehaviorSubject([]);
    console.log('Usuario seleccionado:', user);

    this.loanList$ = this._librarianSrv.loansByUser(this.usuarioSeleccionado!.documento);
  }

  changeValue(index: number, loan: ILoanByUser) {
    // loan.marcado = !loan.marcado;

    this.loanList$
      .pipe(
        map((list) => {
          list[index].marcado = !list[index].marcado;
          return list;
        })
      )
      .subscribe((values) => {
        console.log(values);
      });
  }
}
