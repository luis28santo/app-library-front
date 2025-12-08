import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../core/service/toast.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined;

  constructor(
    private _toastSrv: ToastService,
    private _fb: FormBuilder,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      correoElectronico: ['carlosacosta@gmail.com', Validators.required],
      password: ['carlos123', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm?.invalid) {
      this._toastSrv.error('Formulario invalido');
      return;
    }

    this._authService.login(this.loginForm?.value).subscribe({
      next: () => {},
      error: (error) => {
        console.log({ error });
        this._toastSrv.error(error.message || 'Error, datos invalidos', 2000);
      },
    });
  }
}
