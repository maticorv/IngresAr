export interface IEspacioComun {
    id: number;
    nombreEspacioComun: string;
    disponibilidadDesde: Date;
    disponibilidadHasta: Date;
    fotoEspacioComun: string;
    fotoEspacioComunContentType: string;
    horaDesde: Date;
    horaHasta: Date;
    espacioBarrio?: any;
    espacioTipos: any[];
}
