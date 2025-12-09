export interface IMenuRol {
  administrador: IMenuOption[];
  bibliotecario: IMenuOption[];
  lector: IMenuOption[];
  [key: string]: any;
}

export interface IMenuOption {
  description: string;
  path: string;
  icon: string;
}

export const MENU_ROL: IMenuRol = {
  administrador: [
    {
      description: 'Registrar usuario',
      path: 'register-user',
      icon: 'fa-solid fa-users',
    },
    {
      description: 'Registrar libro',
      path: 'register-book',
      icon: 'fa-solid fa-book-open',
    },
    {
      description: 'Registrar autor',
      path: 'register-author',
      icon: 'fa-solid fa-pencil',
    },
    // {
    //   description: 'Registrar préstamo',
    //   path: 'register-loan',
    //   icon: 'fa-solid fa-arrow-right-arrow-left',
    // },
    // {
    //   description: 'Registrar devolución',
    //   path: 'register-return',
    //   icon: 'fa-solid fa-rotate-left',
    // },
  ],
  bibliotecario: [
    {
      description: 'Registrar préstamo',
      path: 'register-loan',
      icon: 'fa-solid fa-arrow-right-arrow-left',
    },
    {
      description: 'Registrar devolución',
      path: 'register-return',
      icon: 'fa-solid fa-rotate-left',
    },
  ],
  lector: [],
};
