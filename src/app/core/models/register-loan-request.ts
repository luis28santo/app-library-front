export interface IRegisterLoanRequest {
  readonly documentoIdentidad: string;
  readonly isbnLibro: string;
  readonly fechaPrestamo: Date;
  readonly fechaDevolucion: string;
}
