import { Vehiculo } from './vehiculo';

export class Personas {
    id: number;
    nombrePersona: string;
    apellidoPersona: string;
    dniPersona?: number;
    telefonoPersona?: number;
    personabarrio?: any;
    personacarnet?: any;
    personaestados?: any;
    listaamigos?: any;
    tipopersona?: any;
    vehiculos = [];
    detalleEvento?: any;
    art?: any;
}
