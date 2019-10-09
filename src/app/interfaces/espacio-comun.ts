export interface IEspacioComun {
    id: number;
    disponibilidadDesde: Date;
    disponibilidadHasta: Date;
    fotoEspacioComun: string;
    fotoEspacioComunContentType: string;
    horaDesde: Date;
    horaHasta: Date;
    espacioBarrio?: any;
    espacioTipos: any[];
}
