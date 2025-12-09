export interface ILoanByUser {
    readonly idPrestamo:       number;
    readonly documentoUsuario: string;
    readonly tituloLibro:      string;
    readonly fechaPrestamo:    string;
    readonly fechaDevolucion:  string;
    readonly estado:           string;
    readonly isbnLibro:        string;
}
