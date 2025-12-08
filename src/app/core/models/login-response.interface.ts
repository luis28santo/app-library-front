export interface ILoginResponse {
  readonly encabezado: IHeaderStatus;
  readonly token: string;
  readonly nombres: string;
  readonly apellidos: string;
  readonly rol: IRol;
}

export interface IHeaderStatus {
  readonly resultado: boolean;
  readonly mensaje: string;
}

export interface IRol {
  readonly idRol: number;
  readonly descripcion: string;
}
