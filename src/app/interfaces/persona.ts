import { IVehiculo } from './vehiculo';

export interface Persona {
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
    vehiculos: IVehiculo[];
    detalleEvento?: any;
    art?: any;
}
