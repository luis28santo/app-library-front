import { IAutor } from "./books-response.interface";
import { IRol } from "./login-response.interface";

export interface IReserveBookResponse {
  readonly idReserva: number;
  readonly usuario: Usuario;
  readonly libro: Libro;
  readonly estado: string;
}

export interface Libro {
  readonly idLibro: number;
  readonly tituloLibro: string;
  readonly autor: IAutor;
  readonly isbnLibro: string;
  readonly editorialLibro: string;
  readonly anioPublicacionLibro: string;
  readonly nroPaginasLibro: number;
  readonly sinopsisLibro: string;
  readonly generoLibro: string;
  readonly rutaImagenLibro: string;
  readonly cantidadLibro: number;
}

export interface Usuario {
  readonly idUsuario: number;
  readonly nombres: string;
  readonly apellidos: string;
  readonly correoElectronico: string;
  readonly documentoIdentidad: string;
  readonly contrasenia: string;
  readonly rol: IRol;
}
