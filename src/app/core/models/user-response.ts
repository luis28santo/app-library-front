import { IRol } from './login-response.interface';

export interface IUserResponse {
  readonly idUsuario: number;
  readonly nombres: string;
  readonly apellidos: string;
  readonly correoElectronico: string;
  readonly documentoIdentidad: string;
  readonly contrasenia: string;
  readonly rol: IRol;
}
