export interface Ievent {
    id: number;
    nombreEvento: string;
    fecha: Date;
    horaInicio: Date;
    horaFin: Date;
    eventoPeriodo?: any;
    eventoDomicilio?: any;
    eventoEspacio?: any;
    eventoPersona?: any;
    estadoEvento?: any;
    eventoDetalles: any[];
}
