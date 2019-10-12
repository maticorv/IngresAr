import { Persona } from './persona';

export interface IReporte {
    descripcion: string;
    fecha: Date;
    id: number;
    reportePersona: Persona;
}
