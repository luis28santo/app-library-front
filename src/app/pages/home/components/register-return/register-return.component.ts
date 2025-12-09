import { Component } from '@angular/core';
import { LibrarianService } from '../../../../core/service/librarian.service';
import { IUserByFullNameResponse } from '../../../../core/models/user-by-fullname-response';
import { ILoanByUser } from '../../../../core/models/loan-by-user';
import { IBookReturnRequest } from '../../../../core/models/book-return-request';

@Component({
  selector: 'app-register-return',
  templateUrl: './register-return.component.html',
  styleUrl: './register-return.component.scss',
})
export class RegisterReturnComponent {
  searchUserTerm: string = '';
  userResults: IUserByFullNameResponse[] = [];
  selectedUser: IUserByFullNameResponse | null = null;
  isUserSelected: boolean = false;

  loansByUser: (ILoanByUser & { selected?: boolean })[] = [];

  constructor(private librarianSrv: LibrarianService) {}

  onUserSearch() {
    const term = this.searchUserTerm.trim();

    if (term.length < 2) {
      this.userResults = [];
      return;
    }

    this.librarianSrv.getUsersByFullName(term).subscribe({
      next: (res) => (this.userResults = res),
      error: () => (this.userResults = []),
    });
  }

  selectUser(user: IUserByFullNameResponse) {
    this.selectedUser = user;
    this.searchUserTerm = `${user.nombre} ${user.apellido}`;
    this.isUserSelected = true;
    this.userResults = [];

    this.loadLoans(user.documento);
  }

 
  loadLoans(document: string) {
    this.librarianSrv.loansByUser(document).subscribe({
      next: (res: ILoanByUser[]) => {
        this.loansByUser = res.map((l) => ({
          ...l,
          selected: false,
        }));
      },
      error: () => (this.loansByUser = []),
    });
  }

 
  registerReturn() {
    if (!this.selectedUser) {
      alert('Seleccione un usuario.');
      return;
    }

    const selectedLoans = this.loansByUser.filter((l) => l.selected);

    if (selectedLoans.length === 0) {
      alert('Seleccione al menos un libro para devolver.');
      return;
    }

    const loan = selectedLoans[0];

    const request: IBookReturnRequest = {
      documentoIdentidad: this.selectedUser.documento,
      isbnLibro: loan.isbnLibro,
      // fechaPrestamo: loan.fechaPrestamo,
    };

    this.librarianSrv.bookReturn(request).subscribe({
      next: () => {
        alert('Devolución registrada correctamente.');
        this.loansByUser = [];
        this.selectedUser = null;
        this.searchUserTerm = '';
        this.isUserSelected = false;
      },
      error: () => alert('Error al registrar la devolución'),
    });
  }
}
