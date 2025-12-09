import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToastService } from '../../../../core/service/toast.service';
import { AdminService } from '../../../../core/service/admin.service';
import { IAutorResponse } from '../../../../core/models/autor-response';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-book.component',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-book.component.html',
  styleUrl: './register-book.component.scss',
})
export class RegisterBookComponent implements OnInit {
  bookRegisterForm!: FormGroup;
  autores$!: Observable<IAutorResponse[]>;
  imagenPreviewUrl: string | ArrayBuffer | null = null;
  constructor(
    private _toastSrv: ToastService,
    private _fb: FormBuilder,
    private _adminSrv: AdminService
  ) {}

  ngOnInit(): void {
    this.getAutores();
    this.bookRegisterForm = this._fb.group({
      tituloLibro: ['hamlet4', [Validators.required]],
      file: [null, Validators.required],
      idAutor: ['', Validators.required],
      isbnLibro: ['9782424474745', Validators.required],
      editorialLibro: ['Sudamericana', [Validators.required]],
      anioPublicacionLibro: ['1967', Validators.required],
      nroPaginasLibro: ['417', Validators.required],
      sinopsisLibro: ['Una novela icónica del realismo mágico.', Validators.required],
      generoLibro: ['Realismo mágico', Validators.required],
      cantidadLibro: ['10', Validators.required],
    });
  }

  registerBook() {
    if (this.bookRegisterForm.invalid) {
      this._toastSrv.error('Formulario invalido');
      return;
    }

    const formValue = this.bookRegisterForm.value;
    const formData = new FormData();
    formData.append('tituloLibro', formValue.tituloLibro);
    formData.append('autor.idAutor', formValue.idAutor);
    formData.append('isbnLibro', formValue.isbnLibro);
    formData.append('editorialLibro', formValue.editorialLibro);
    formData.append('anioPublicacionLibro', formValue.anioPublicacionLibro);
    formData.append('nroPaginasLibro', formValue.nroPaginasLibro);
    formData.append('sinopsisLibro', formValue.sinopsisLibro);
    formData.append('generoLibro', formValue.generoLibro);
    formData.append('cantidadLibro', formValue.cantidadLibro);
    formData.append('file', formValue.file);

    this._adminSrv.registerBook(formData).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastSrv.success(resp.message);
      },
      error: (error) => {
        const errorValue = JSON.parse(error.error);
        this._toastSrv.error(errorValue?.detalle || error.message);
      },
    });
  }

  getAutores() {
    this.autores$ = this._adminSrv.getAutores();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // 1. Almacenar el objeto File en el FormControl 'documento'
      this.bookRegisterForm.get('file')!.setValue(file);

      // 2. Marcar el control como 'dirty' y 'touched'
      this.bookRegisterForm.get('file')!.updateValueAndValidity();

      const reader = new FileReader();

      reader.onload = () => {
        // Cuando el lector termina, almacena la Data URL
        this.imagenPreviewUrl = reader.result;
      };

      // Leer el archivo como una URL de datos
      reader.readAsDataURL(file);
    }
  }
}
