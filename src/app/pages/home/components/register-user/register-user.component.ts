import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ToastService } from '../../../../core/service/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../../core/service/admin.service';
import { IUserRegisterRequest } from '../../../../core/models/user-register-request';

const roles = [
  { description: 'admin', value: 1 },
  { description: 'reader', value: 2 },
  { description: 'librarian', value: 3 },
];

@Component({
  selector: 'app-register-user.component',
  imports: [ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss',
})
export class RegisterUserComponent implements OnInit, AfterViewInit {
  userRegisterForm!: FormGroup;
  constructor(
    private _toastSrv: ToastService,
    private _fb: FormBuilder,
    private _adminSrv: AdminService
  ) {}

  ngOnInit(): void {
    this.userRegisterForm = this._fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', Validators.required],
      correoElectronico: ['', Validators.required],
      documentoIdentidad: ['', Validators.required],
      contrasenia: [
        'Contraseña123',
        [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)],
      ],
      idRol: ['admin', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }

  registerUser() {
    if (this.userRegisterForm.invalid) {
      this.userRegisterForm.markAllAsTouched();
      this._toastSrv.error('Formulario invalido');
      return;
    }

    const { nombres, apellidos, correoElectronico, documentoIdentidad, contrasenia, idRol } =
      this.userRegisterForm?.value;

    const request: IUserRegisterRequest = {
      nombres,
      apellidos,
      correoElectronico,
      documentoIdentidad,
      contrasenia,
      rol: { idRol: roles.find((rol) => rol.description == idRol)!.value },
    };

    console.log(request);

    this._adminSrv.registerUser(request).subscribe({
      next: (resp) => {
        console.log(resp);
        this._toastSrv.success(resp?.message || 'Registro exitoso');
      },

      error: (error) => {
        console.log(error);
        this._toastSrv.error(error.message || 'Error');
      },
    });
  }

  validControl(controlName: string) {
    return (
      this.userRegisterForm.get(controlName)?.invalid &&
      (this.userRegisterForm.get(controlName)?.touched ||
        this.userRegisterForm.get(controlName)?.dirty)
    );
  }
}
