export interface IBookResponse {
  readonly idLibro: number;
  readonly tituloLibro: string;
  readonly autor: IAutor;
  readonly isbnLibro: string;
  readonly editorialLibro: string;
  readonly anioPublicacionLibro: string;
  readonly nroPaginasLibro: number;
  readonly sinopsisLibro: string;
  readonly generoLibro: string;
  rutaImagenLibro: string;
  readonly cantidadLibro: number;
}

export interface IAutor {
  readonly idAutor: number;
  readonly nombreAutor: string;
  readonly apellidoAutor: string;
  readonly biografiaAutor: string;
}
