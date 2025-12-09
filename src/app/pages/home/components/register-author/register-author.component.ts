import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../core/service/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../core/service/admin.service';
import { IAutorRegisterRequest } from '../../../../core/models/autor-register-request';

@Component({
  selector: 'app-register-author.component',
  imports: [ReactiveFormsModule],
  templateUrl: './register-author.component.html',
  styleUrl: './register-author.component.scss',
})
export class RegisterAuthorComponent implements OnInit, AfterViewInit {
  authorRegisterForm!: FormGroup;

  constructor(
    private _toastSrv: ToastService,
    private _fb: FormBuilder,
    private _adminSrv: AdminService
  ) {}

  ngOnInit(): void {
    this.authorRegisterForm = this._fb.group({
      nombreAutor: ['', Validators.required],
      apellidoAutor: ['', Validators.required],
      biografiaAutor: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    console.log('RegisterAuthor Loaded');
  }

  registerAuthor() {
    if (this.authorRegisterForm.invalid) {
      this.authorRegisterForm.markAllAsTouched();
      this._toastSrv.error('Formulario inválido');
      return;
    }

    const { nombreAutor, apellidoAutor, biografiaAutor } = this.authorRegisterForm.value;

    const request: IAutorRegisterRequest = {
      nombreAutor,
      apellidoAutor,
      biografiaAutor,
    };

    console.log(request);

    this._adminSrv.registerAutor(request).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastSrv.success(resp?.message || 'Autor registrado correctamente');
      },
      error: (error) => {
        console.log(error);
        this._toastSrv.error(error.message || 'Error al registrar autor');
      },
    });
  }

  validControl(controlName: string) {
   return (
      this.authorRegisterForm.get(controlName)?.invalid &&
      (this.authorRegisterForm.get(controlName)?.touched ||
        this.authorRegisterForm.get(controlName)?.dirty)
    );
  }
}
