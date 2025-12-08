export interface IUserRegisterRequest {
  readonly nombres: string;
  readonly apellidos: string;
  readonly correoElectronico: string;
  readonly documentoIdentidad: string;
  readonly contrasenia: string;
  readonly rol: Rol;
}

export interface Rol {
  readonly idRol: number;
}
