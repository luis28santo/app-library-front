import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LibrarianService } from '../../../../core/service/librarian.service';
import { IUserByFullNameResponse } from '../../../../core/models/user-by-fullname-response';
import { IBookResponse } from '../../../../core/models/books-response.interface';
import { IRegisterLoanRequest } from '../../../../core/models/register-loan-request';
import { ToastService } from '../../../../core/service/toast.service';

@Component({
  selector: 'app-register-loan',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-loan.component.html',
  styleUrls: ['./register-loan.component.scss'],
})

export class RegisterLoanComponent {
  searchUserTerm = '';
  searchBookTerm = '';

  userResults: IUserByFullNameResponse[] = [];
  bookResults: IBookResponse[] = [];

  selectedUser?: IUserByFullNameResponse;
  selectedBook?: IBookResponse;

  returnDate: string = '';

  isUserSelected = false;
  isBookSelected = false;

  constructor(private librarianSrv: LibrarianService, private toastService: ToastService) {}

  // ==========================
  // BUSCAR USUARIO
  // ==========================
  onUserSearch() {
    this.isUserSelected = false;
    const term = this.searchUserTerm.trim();

    if (term.length < 2) {
      this.userResults = [];
      return;
    }

    // Si es DNI (solo números)
    if (/^\d+$/.test(term)) {
      this.librarianSrv.getUsers().subscribe({
        next: (res) => {
          this.userResults = res
            .filter((u) => u.documentoIdentidad.includes(term))
            .map(
              (u) =>
                ({
                  documento: u.documentoIdentidad,
                  nombre: u.nombres,
                  apellido: u.apellidos,
                } as IUserByFullNameResponse)
            );
        },
        error: () => (this.userResults = []),
      });
      return;
    }

    // Si es nombre o apellido
    this.librarianSrv.getUsersByFullName(term).subscribe({
      next: (res) => (this.userResults = res),
      error: () => (this.userResults = []),
    });
  }

  selectUser(user: IUserByFullNameResponse) {
    this.selectedUser = user;
    this.searchUserTerm = `${user.nombre} ${user.apellido}`;
    this.userResults = [];
    this.isUserSelected = true;
  }

  // ==========================
  // BUSCAR LIBRO
  // ==========================
  onBookSearch() {
    this.isBookSelected = false;
    const term = this.searchBookTerm.trim().toLowerCase();

    if (term.length < 2) {
      this.bookResults = [];
      return;
    }

    this.librarianSrv.searchBookByTitle(term).subscribe({
      next: (res: IBookResponse[]) => {
        let results: IBookResponse[] = [];

        // ===============================
        // 1) Coincidencias por título
        // ===============================
        results = res.filter((b) => b.tituloLibro.toLowerCase().includes(term));

        if (/^[0-9\-]+$/.test(term)) {
          const isbnMatches = res.filter((b) => b.isbnLibro.toLowerCase().includes(term));

          results = results.concat(isbnMatches);
        }

        // ===============================
        // 3) Eliminar duplicados por idLibro
        // ===============================
        this.bookResults = [...new Map(results.map((b) => [b.idLibro, b])).values()];
      },
      error: () => (this.bookResults = []),
    });
  }

  selectBook(book: IBookResponse) {
    this.selectedBook = book;
    this.searchBookTerm = `${book.tituloLibro} — ${book.isbnLibro}`;
    this.bookResults = [];
    this.isBookSelected = true;
  }

  getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  registerLoan() {
    if (!this.selectedUser || !this.selectedBook || !this.returnDate) {
      this.toastService.error('Debe completar todos los campos.');
      return;
    }

    const request: IRegisterLoanRequest = {
      documentoIdentidad: this.selectedUser.documento,
      isbnLibro: this.selectedBook.isbnLibro,
      fechaPrestamo: this.getCurrentDate(),
      fechaDevolucion: this.returnDate,
    };

    console.log('📤 REQUEST ENVIADO:', request);

    this.librarianSrv.registerLoan(request).subscribe({
      next: () => this.toastService.success('Préstamo registrado correctamente'),
      error: (err) => {
        console.error('❌ ERROR API:', err);
        this.toastService.error('Error al registrar el préstamo');
      },
    });
  }
}
