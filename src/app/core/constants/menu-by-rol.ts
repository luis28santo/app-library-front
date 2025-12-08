export interface IMenuRol {
  administrador: IMenuOption[];
  bibliotecario: IMenuOption[];
  lector: IMenuOption[];
  [key: string]: any;
}

export interface IMenuOption {
  description: string;
  path: string;
}

export const MENU_ROL: IMenuRol = {
  administrador: [
    {
      description: 'Registrar usuario',
      path: 'register-user',
    },
    {
      description: 'Registrar libro',
      path: 'register-book',
    },
    {
      description: 'Registrar autor',
      path: '',
    },
  ],
  bibliotecario: [
    {
      description: 'Registrar préstamo',
      path: '',
    },
    {
      description: 'Registrar devolución',
      path: '',
    },
  ],
  lector: [],
};
