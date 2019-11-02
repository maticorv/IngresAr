import { Persona } from './persona';

export interface ICarnet {
    id: number;
    categoria: string;
    fechaOtorgamiento: Date;
    fechaVencimiento: Date;
    carnetPersona?: Persona;
}
