export interface IRegisterLoanRequest {
  readonly documentoIdentidad: string;
  readonly isbnLibro: string;
  readonly fechaPrestamo: string;
  readonly fechaDevolucion: string;
}
