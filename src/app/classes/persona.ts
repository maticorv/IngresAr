import { Vehiculo } from './vehiculo';

export class Personas {
    id: number;
    nombrePersona: string;
    apellidoPersona: string;
    dniPersona: number;
    telefonoPersona: number;
    personaUser: any;
    personabarrio: any;
    vehiculos: Vehiculo[];
    personadomicilios?: any;
}
