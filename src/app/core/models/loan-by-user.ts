export interface ILoanByUser {
    readonly idPrestamo:       number;
    readonly documentoUsuario: string;
    readonly tituloLibro:      string;
    readonly fechaPrestamo:    Date;
    readonly fechaDevolucion:  Date;
    readonly estado:           string;
}
