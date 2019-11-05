import { IEspacioComun } from './espacio-comun';
import { IDetalleEvento } from './idetalle-evento';
import { Persona } from './persona';
export interface Ievent {
    id: number;
    nombreEvento: string;
    fecha: Date;
    horaInicio: Date;
    horaFin: Date;
    eventoPeriodo?: any;
    eventoDomicilio?: any;
    eventoEspacio: IEspacioComun;
    eventoPersona: Persona;
    estadoEvento?: any;
    eventoDetalles: IDetalleEvento[];
}
