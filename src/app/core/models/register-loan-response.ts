export interface IRegisterLoanResponse {
  readonly idPrestamo: number;
  readonly usuario: Usuario;
  readonly libro: Libro;
  readonly fechaPrestamo: string;
  readonly fechaDevolucion: string;
  readonly estado: string;
}

export interface Libro {
  readonly idLibro: number;
  readonly tituloLibro: string;
  readonly autor: Autor;
  readonly isbnLibro: string;
  readonly editorialLibro: string;
  readonly anioPublicacionLibro: string;
  readonly nroPaginasLibro: number;
  readonly sinopsisLibro: string;
  readonly generoLibro: string;
  readonly rutaImagenLibro: string;
  readonly cantidadLibro: number;
}

export interface Autor {
  readonly idAutor: number;
  readonly nombreAutor: string;
  readonly apellidoAutor: string;
  readonly biografiaAutor: string;
}

export interface Usuario {
  readonly idUsuario: number;
  readonly nombres: string;
  readonly apellidos: string;
  readonly correoElectronico: string;
  readonly documentoIdentidad: string;
  readonly contrasenia: string;
  readonly rol: Rol;
}

export interface Rol {
  readonly idRol: number;
  readonly descripcion: string;
}
