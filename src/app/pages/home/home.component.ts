import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { StorageService } from '../../core/service/storage.service';
import { IUser } from '../../core/models/user.interface';
import { KEYS } from '../../core/constants/storage-keys';
import { IRol } from '../../core/models/login-response.interface';
import { IMenuOption, MENU_ROL } from '../../core/constants/menu-by-rol';

@Component({
  selector: 'app-home.component',
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isSidebarOpen = false;
  user: IUser | null | undefined;
  menuOptions: IMenuOption[] = [];
  rolDescription: string | undefined;

  constructor(
    private _authSrv: AuthService,
    private _router: Router,
    private _storageSrv: StorageService
  ) {}

  ngOnInit(): void {
    this.rolDescription = this._storageSrv.get<IRol>(KEYS.rol)!.descripcion;
    this.menuOptions = MENU_ROL[this.rolDescription.toLocaleLowerCase()];
    this.user = this._storageSrv.get<IUser>(KEYS.userInfo);
    console.log({ menu: this.menuOptions, user: this.user });
  }

  logout() {
    this._authSrv.logout();
    this._router.navigate(['/login']);
  }
}
